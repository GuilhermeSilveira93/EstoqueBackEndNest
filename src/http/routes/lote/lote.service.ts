import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateLoteDto } from './dto/create-lote.dto';

@Injectable()
export class LoteService {
  constructor(private prisma: PrismaService) {}
  async create({
    ID_FORNECEDOR,
    data,
  }: {
    ID_FORNECEDOR: string;
    data: CreateLoteDto;
  }) {
    const { DADOS } = data;
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const lote = await prisma.sT_LOTE.create({
          data: {
            ID_FORNECEDOR,
          },
        });

        return await prisma.sT_PRODUTO_LOTE.createMany({
          data: DADOS.map((dado) => ({
            ID_LOTE: lote.ID_LOTE,
            ID_PRODUTO: dado.ID_PRODUTO,
            N_QUANTIDADE: dado.N_QUANTIDADE,
            S_DIMENSAO: dado.S_DIMENSAO,
            S_DETALHES: dado.S_DETALHES,
            N_VALOR: dado.N_VALOR,
          })),
        });
      });
    } catch (error) {}
  }
}
