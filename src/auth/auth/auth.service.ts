import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async getUser(
    S_EMAIL: string,
    S_SENHA: string,
  ): Promise<{
    ID_USUARIO: number;
    code?: string;
    S_NOME: string;
    ID_GRUPO: number;
  }> {
    try {
      const chave = await this.prismaService.st_usuario.findFirstOrThrow({
        select: {
          S_CHAVE: true,
        },
        where: {
          S_EMAIL,
        },
      });
      const password = await bcrypt.hash(S_SENHA, chave.S_CHAVE);

      return await this.prismaService.st_usuario.findFirstOrThrow({
        select: {
          ID_USUARIO: true,
          S_NOME: true,
          ID_GRUPO: true,
        },
        where: {
          S_EMAIL,
          S_SENHA: password,
          S_ATIVO: 'S',
        },
      });
    } catch (error: any) {
      return error;
    }
  }
  async login(req: LoginDto): Promise<{ token?: string; message: string }> {
    const { S_EMAIL, S_SENHA } = req.body;
    const user = await this.getUser(S_EMAIL, S_SENHA);

    if (user.code === 'P2025') {
      return { message: `E-mail ou Senha não encontrado: ${S_EMAIL}` };
    }

    const payload = {
      sub: user.ID_USUARIO,
      ...user,
    };

    return {
      token: this.jwtService.sign(payload),
      message: 'Login realizado com sucesso',
    };
  }
}
