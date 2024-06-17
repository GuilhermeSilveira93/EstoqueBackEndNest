import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { FindFornecedorDto } from './dto/findFornecedor.dto';

@Injectable()
export class FornecedorService {
  constructor(private prisma: PrismaService) {}
  async findAll(req: FindFornecedorDto) {
    const {
      ID_FORNECEDOR,
      Search,
      Page = '0',
      LimitPerPage = '10',
      S_ATIVO = 'S',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const total = await this.prisma.st_fornecedor.count({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_FORNECEDOR: ID_FORNECEDOR ? Number(ID_FORNECEDOR) : undefined,
      },
    });

    const consulta = await this.prisma.st_fornecedor.findMany({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_FORNECEDOR: ID_FORNECEDOR ? Number(ID_FORNECEDOR) : undefined,
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    return { data: consulta, total };
  }
}
