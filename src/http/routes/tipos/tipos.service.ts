import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateTipoDto } from './dto/createtipo.dto';
import { FindTipoDto } from './dto/findtipo.dto';
import { UpdateTipoDto } from './dto/updatetipo.dto';

@Injectable()
export class TiposService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const total = await this.prisma.st_tipo.count({
      where: {
        S_ATIVO: 'S',
      },
      orderBy: { S_NOME: 'asc' },
    });

    const consulta = await this.prisma.st_tipo.findMany({
      where: {
        S_ATIVO: 'S',
      },
      orderBy: { S_NOME: 'asc' },
    });

    return { data: consulta, total };
  }
  async findWithParams(req: FindTipoDto) {
    const {
      ID_TIPO,
      Search,
      S_ATIVO = 'S',
      LimitPerPage = '10',
      Page = '0',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const total = await this.prisma.st_tipo.count({
      where: {
        ID_TIPO: ID_TIPO ? Number(ID_TIPO) : undefined,
        S_ATIVO,
        S_NOME: { contains: Search },
      },
      orderBy: { S_NOME: 'asc' },
    });

    const consulta = await this.prisma.st_tipo.findMany({
      where: {
        ID_TIPO: ID_TIPO ? Number(ID_TIPO) : undefined,
        S_ATIVO,
        S_NOME: { contains: Search },
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    return { data: consulta, total };
  }
  async updateTipo({
    data,
    ID_TIPO,
  }: {
    data: UpdateTipoDto;
    ID_TIPO: number;
  }) {
    const { S_NOME, S_ATIVO } = data;

    return this.prisma.st_tipo.update({
      data: {
        S_NOME,
        S_ATIVO: S_ATIVO ? 'S' : 'N',
      },
      where: {
        ID_TIPO,
      },
    });
  }
  async createTipo(req: CreateTipoDto) {
    const { S_NOME } = req;

    return await this.prisma.st_tipo
      .create({
        data: {
          S_NOME,
        },
      })
      .catch((err) => {
        throw new Error(JSON.stringify(err));
      });
  }
}
