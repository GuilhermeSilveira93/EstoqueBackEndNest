import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { FilterUserDto } from './dto/filter-usuario.dto';
import { UpdateUserDTO } from './dto/update-usuario.dto';
@Injectable()
export class UsuarioService {
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {}
  async getAll(req: FilterUserDto) {
    const {
      ID_USUARIO,
      Search,
      S_ATIVO = 'S',
      LimitPerPage = '10',
      Page = '0',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const users = await this.prisma.st_usuario.findMany({
      select: {
        ID_USUARIO: true,
        S_NOME: true,
        S_EMAIL: true,
        S_SENHA: true,
        ID_GRUPO: true,
        D_EXPIRACAO_SENHA: true,
        S_ATIVO: true,
        S_CHAVE: true,
        N_TENTATIVAS_LOGIN: true,
        ST_GRUPO: {
          select: {
            N_NIVEL: true,
          },
        },
      },
      where: {
        ID_USUARIO: ID_USUARIO ? Number(ID_USUARIO) : undefined,
        S_ATIVO: undefined,
        S_NOME: { contains: Search },
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    const total = await this.prisma.st_usuario.count({
      where: {
        ID_USUARIO: ID_USUARIO ? Number(ID_USUARIO) : undefined,
        S_ATIVO,
        S_NOME: { contains: Search },
      },
      orderBy: { S_NOME: 'asc' },
    });

    return { data: users, total };
  }
  async updateUser({
    ID_USUARIO,
    data,
  }: {
    ID_USUARIO: number;
    data: UpdateUserDTO;
  }) {
    const { ID_GRUPO, S_ATIVO, S_EMAIL, S_NOME, S_SENHA } = data;

    if (!S_SENHA) {
      return await this.prisma.st_usuario.update({
        data: {
          S_NOME,
          ID_GRUPO,
          S_EMAIL,
          S_ATIVO: S_ATIVO ? 'S' : 'N',
        },
        where: { ID_USUARIO: Number(ID_USUARIO) },
      });
    } else {
      const chave = await bcrypt.genSalt(8);
      const password = await bcrypt.hash(S_SENHA, chave);
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      date.setHours(date.getHours() - 3);

      return this.prisma.st_usuario.update({
        data: {
          S_NOME,
          S_EMAIL,
          S_SENHA: password,
          ID_GRUPO,
          D_EXPIRACAO_SENHA: date,
          S_CHAVE: chave,
          S_ATIVO: S_ATIVO ? 'S' : 'N',
        },
        where: {
          ID_USUARIO,
        },
      });
    }
  }
  async createUser(data: UpdateUserDTO) {
    const { S_EMAIL, S_NOME, ID_GRUPO, S_SENHA: senha } = data;
    const D_EXPIRACAO_SENHA = new Date();
    D_EXPIRACAO_SENHA.setFullYear(D_EXPIRACAO_SENHA.getFullYear() + 1);
    D_EXPIRACAO_SENHA.setHours(D_EXPIRACAO_SENHA.getHours() - 3);
    const S_CHAVE = await bcrypt.genSalt(8);
    const S_SENHA = await bcrypt.hash(senha, S_CHAVE);

    return await this.prisma.st_usuario.create({
      data: {
        S_NOME,
        S_EMAIL,
        S_SENHA,
        ID_GRUPO,
        D_EXPIRACAO_SENHA,
        S_CHAVE,
        S_ATIVO: 'S',
      },
    });
  }
}
