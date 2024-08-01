import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateLoteDto } from './dto/create-lote.dto';

@Injectable()
export class LoteService {
  constructor(private prisma: PrismaService) {}
  async createEntrada({
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
  async createSaida({
    ID_CLIENTE,
    data,
  }: {
    ID_CLIENTE: string;
    data: CreateLoteDto;
  }) {
    const { DADOS } = data;
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const lote = await prisma.sT_LOTE.create({
          data: {
            ID_CLIENTE,
          },
        });
      const produtosDeEntrada = await this.prisma.vw_estoque.findMany({where: {ID_PRODUTO: {in: DADOS.map( dado => dado.ID_PRODUTO)}}})
      const algumNegativo = produtosDeEntrada.find(produto => {
        const dadoCorrespondente = DADOS.find(dado => dado.ID_PRODUTO === produto.ID_PRODUTO);
        return dadoCorrespondente.N_QUANTIDADE > produto.qtd;
      });
      if(algumNegativo){
        const produto = await prisma.sT_PRODUTO.findUnique({select: {S_NOME:true},where: {ID_PRODUTO: algumNegativo.ID_PRODUTO}})
        throw new Error(`${produto.S_NOME} com quantidade insuficiente, ${algumNegativo.qtd} em estoque.`)
      }
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
    } catch (error) {
      const _error = error as { message: string };
      throw new Error(_error.message)
    }
  }
}
