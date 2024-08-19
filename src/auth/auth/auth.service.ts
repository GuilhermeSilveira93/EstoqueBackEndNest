import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { LoginDtoSchemaType } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(req: LoginDtoSchemaType): Promise<{ token?: string; message: string }> {
    const { S_EMAIL, S_SENHA } = req.body;
    const D_DATA = new Date(new Date().setHours(new Date().getHours() - 3));
    
    const user = await this.prismaService.sT_USUARIO.findFirst({
      select: {
        ID_USUARIO: true,
        S_SENHA: true,
        S_NOME: true,
        ID_GRUPO: true,
        st_grupo: {
          select: {
            N_NIVEL: true,
          },
        },
      },
      where: {
        S_EMAIL,
        S_ATIVO: 'S',
      },
    });
    if (!user) {
      await this.prismaService.sT_LOG_ACESSO.create({
        data: {
          ID_USUARIO: '',
          S_EMAIL,
          S_SENHA,
          D_DATA,
          S_PERMITIDO: 'N',
        },
      });
      throw new UnauthorizedException('INVALID_EMAIL');
    }
    const isPasswordValid = await bcrypt.compare(S_SENHA, user.S_SENHA)
    if(!isPasswordValid) {
      await this.prismaService.sT_LOG_ACESSO.create({
        data: {
          ID_USUARIO: user.ID_USUARIO,
          S_EMAIL,
          S_SENHA,
          D_DATA,
          S_PERMITIDO: 'S',
        },
      });
      throw new UnauthorizedException('INVALID_PASSWORD');
    }
    delete user.S_SENHA
    const payload = {
      sub: user.ID_USUARIO,
      ...user,
    };
    return {
      token: this.jwtService.sign(payload),
      message: 'AUTH_SUCCESS',
    };
    
  }
}
