import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateLoteDto } from './dto/create-lote.dto';
import { RelatorioEntradaDto } from './dto/relatorio-entrada.dto';
import { RelatorioSaidaDto } from './dto/relatorio-saida.dto';

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
        const produtosDeEntrada = await this.prisma.vw_estoque.findMany({
          where: { ID_PRODUTO: { in: DADOS.map((dado) => dado.ID_PRODUTO) } },
        });
        const algumNegativo = produtosDeEntrada.find((produto) => {
          const dadoCorrespondente = DADOS.find(
            (dado) => dado.ID_PRODUTO === produto.ID_PRODUTO,
          );
          return dadoCorrespondente.N_QUANTIDADE > produto.qtd;
        });
        if (algumNegativo) {
          const produto = await prisma.sT_PRODUTO.findUnique({
            select: { S_NOME: true },
            where: { ID_PRODUTO: algumNegativo.ID_PRODUTO },
          });
          throw new Error(
            `${produto.S_NOME} com quantidade insuficiente, ${algumNegativo.qtd} em estoque.`,
          );
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
      throw new Error(_error.message);
    }
  }
  async relatorioEntrada({ data }: { data: RelatorioEntradaDto }) {
    const { D_DATA, ID_FORNECEDOR, ID_PRODUTO } = data;
    try {
      const consulta = await this.prisma.sT_PRODUTO_LOTE
        .findMany({
          select: {
            N_QUANTIDADE: true,
            ST_LOTE: {
              select: {
                D_DATA_INICIO: true,
                ST_FORNECEDOR: { select: { S_NOME: true } },
              },
            },
            ST_PRODUTO: { select: { S_NOME: true } },
          },
          where: {
            ST_LOTE: {
              ST_FORNECEDOR: { ID_FORNECEDOR },
              ST_CLIENTE: { is: null },
              D_DATA_INICIO: { gte: D_DATA.D_INICIO, lte: D_DATA.D_FIM},
            },
            ST_PRODUTO: { ID_PRODUTO: ID_PRODUTO },
          },
          orderBy: { ST_LOTE: { D_DATA_INICIO: 'asc' } },
        })
        .then((res) => {
          return res.map((item) => {
            return {
              PRODUTO: item.ST_PRODUTO.S_NOME,
              QUANTIDADE: item.N_QUANTIDADE,
              FORNECEDOR: item.ST_LOTE.ST_FORNECEDOR.S_NOME,
              DATA: new Date(item.ST_LOTE.D_DATA_INICIO).toLocaleDateString(),
            };
          });
        });
        if (consulta.length > 0) {
          return consulta
        }
        throw new Error('Não foi encontrado movimentação para o filtro selecionado.')
    } catch (error) {
      const _error = error as { message: string };
      throw new Error(_error.message);
    }
  }
  async relatorioSaida({ data }: { data: RelatorioSaidaDto }) {
    const { D_DATA, ID_EMPRESA, ID_CLIENTE, ID_PRODUTO } = data;
    try {
      const consulta = await this.prisma.sT_LOTE
        .findMany({
          select: {
            D_DATA_INICIO: true,
            ST_CLIENTE: {
              select: {
                S_NOME: true,
                ST_EMPRESA: { select: { S_NOME: true } },
              },
              where: {ID_CLIENTE, ID_EMPRESA}
            },
            ST_PRODUTO_LOTE: {
              select: {
                N_QUANTIDADE: true,
                ST_PRODUTO: { select: { S_NOME: true } },
              },
              where: {ID_PRODUTO}
            },
          },
          where: {
            D_DATA_INICIO: { gte: D_DATA.D_INICIO, lte: D_DATA.D_FIM },
            ST_FORNECEDOR: { is: null },
          },
          orderBy: { D_DATA_INICIO: 'asc' },
        })
        .then((res) => {
          return res.reduce((result,item) => {
              for (let i = 0; i < item.ST_PRODUTO_LOTE.length; i++) {
                result.push({
                  PRODUTO: item.ST_PRODUTO_LOTE[i].ST_PRODUTO.S_NOME,
                  QUANTIDADE: item.ST_PRODUTO_LOTE[i].N_QUANTIDADE,
                  CLIENTE: item.ST_CLIENTE.S_NOME,
                  EMPRESA: item.ST_CLIENTE.ST_EMPRESA.S_NOME,
                  DATA: new Date(item.D_DATA_INICIO).toLocaleDateString(),
                });
              }
              return result;
            },
            [] as {
              PRODUTO: string;
              QUANTIDADE: number;
              CLIENTE: string;
              EMPRESA: string;
              DATA: string;
            }[],
          );
        });
        if (consulta.length > 0) {
          return consulta
        }
        throw new Error('Não foi encontrado movimentação para o filtro selecionado.')
    } catch (error) {
      const _error = error as { message: string };
      throw new Error(_error.message);
    }
  }
}
