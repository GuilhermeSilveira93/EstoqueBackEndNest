import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { GetAllUserDto } from './dto/create-usuario.dto copy';
@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async createUser() {}
  async getAll(req: GetAllUserDto) {
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
      where: {
        ID_USUARIO: ID_USUARIO ? Number(ID_USUARIO) : undefined,
        S_ATIVO,
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
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    return { data: users, total };
  }
}
