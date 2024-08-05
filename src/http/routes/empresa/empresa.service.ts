import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { FindEmpresaDto } from './dto/findEmpresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}
  async getAllWithParams(req: FindEmpresaDto) {
    const {
      ID_EMPRESA,
      Search,
      Page = '0',
      LimitPerPage = '10',
      S_ATIVO = 'S',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const total = await this.prisma.sT_EMPRESA.count({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_EMPRESA: ID_EMPRESA ?? undefined,
      },
    });

    const consulta = await this.prisma.sT_EMPRESA.findMany({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_EMPRESA: ID_EMPRESA ?? undefined,
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    return { data: consulta, total };
  }
  async getAll() {
    const total = await this.prisma.sT_EMPRESA.count({
      where: {
        S_ATIVO: 'S',
      },
    });

    const consulta = await this.prisma.sT_EMPRESA.findMany({
      where: {
        S_ATIVO: 'S',
      },
      orderBy: { S_NOME: 'asc' },
    });

    return { data: consulta, total };
  }
  async createEmpresa(req: CreateEmpresaDto) {
    return await this.prisma.sT_EMPRESA.create({
      data: req,
    });
  }
  async attEmpresa({
    ID_EMPRESA,
    data,
  }: {
    ID_EMPRESA: string;
    data: UpdateEmpresaDto;
  }) {
    try {
      await this.prisma.sT_EMPRESA.update({
        data: {
          S_ATIVO: data.S_ATIVO ? 'S' : 'N',
          S_NOME: data.S_NOME,
        },
        where: {
          ID_EMPRESA,
        },
      });
    } catch (error) {}
  }
}
