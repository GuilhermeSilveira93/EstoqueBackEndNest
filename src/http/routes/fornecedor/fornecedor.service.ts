import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { FindFornecedorDto } from './dto/findFornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Injectable()
export class FornecedorService {
  constructor(private prisma: PrismaService) {}
  async getAllWithParams(req: FindFornecedorDto) {
    const {
      ID_FORNECEDOR,
      Search,
      Page = '0',
      LimitPerPage = '10',
      S_ATIVO = 'S',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const total = await this.prisma.sT_FORNECEDOR.count({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_FORNECEDOR: ID_FORNECEDOR ?? undefined,
      },
    });

    const consulta = await this.prisma.sT_FORNECEDOR.findMany({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_FORNECEDOR: ID_FORNECEDOR ?? undefined,
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    return { data: consulta, total };
  }
  async getAll() {
    const S_ATIVO = 'S'
    const total = await this.prisma.sT_FORNECEDOR.count({
      where: {
        S_ATIVO,
      },
    });

    const consulta = await this.prisma.sT_FORNECEDOR.findMany({
      where: {
        S_ATIVO,
      },
      orderBy: { S_NOME: 'asc' },
    });
    return { data: consulta, total };
  }
  async editFornecedor({
    ID_FORNECEDOR,
    data,
  }: {
    ID_FORNECEDOR: string;
    data: UpdateFornecedorDto;
  }) {
    return await this.prisma.sT_FORNECEDOR.update({
      data: {
        ...data,
        S_ATIVO: data.S_ATIVO ? 'S' : 'N',
      },
      where: { ID_FORNECEDOR },
    });
  }
  async createFornecedor(data: CreateFornecedorDto) {
    return await this.prisma.sT_FORNECEDOR.create({
      data,
    });
  }
}
