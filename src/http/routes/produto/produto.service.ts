import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { ProdutosTabela } from '@/@types/ProdutosTabela';
import { Injectable } from '@nestjs/common';

import { CreateProdutoDTO } from './dto/create-st_produto.dto';
import { FindProdutoDto } from './dto/findproduto.dto';
import { UpdateStProdutoDto } from './dto/update-st_produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}
  async createProd(req: CreateProdutoDTO) {
    const { S_NOME, ID_TIPO, N_SERIAL } = req;

    return await this.prisma.sT_PRODUTO
      .create({
        data: {
          S_NOME,
          ID_TIPO,
          N_SERIAL,
        },
      })
      .catch((err) => {
        throw new Error(JSON.stringify(err));
      });
  }
  async produtos(req: FindProdutoDto) {
    const {
      ID_PRODUTO,
      Search,
      Page = '0',
      LimitPerPage = '10',
      S_ATIVO = 'S',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const total = await this.prisma.sT_PRODUTO.count({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_PRODUTO: ID_PRODUTO ?? undefined,
      },
    });

    const produtos = await this.prisma.sT_PRODUTO.findMany({
      select: {
        ID_PRODUTO: true,
        S_NOME: true,
        ID_TIPO: true,
        N_SERIAL: true,
        S_ATIVO: true,
        ST_TIPO: {
          select: { S_NOME: true },
        },
      },
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_PRODUTO: ID_PRODUTO ?? undefined,
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: { S_NOME: 'asc' },
    });

    return { data: produtos, total };
  }
  async viewProdutos(
    req: FindProdutoDto,
  ): Promise<{ data: ProdutosTabela[]; total: number }> {
    const {
      S_ATIVO = 'S',
      ID_PRODUTO,
      Search = '',
      Page = '0',
      LimitPerPage = '10',
    } = req;

    try {
      const total = await this.prisma.sT_PRODUTO.count({
        where: {
          S_ATIVO,
        },
      });
      const calculoSkip = parseInt(LimitPerPage) * (Number(Page) - 1);
      const skip = calculoSkip < 0 ? 0 : calculoSkip;

      const produtosTabela: ProdutosTabela[] = await this.prisma.$queryRaw`
      select p.ID_PRODUTO, p.S_NOME PRODUTO, case when e.qtd is null then 0 else e.qtd end QUANTIDADE, p.S_ATIVO
      from vw_estoque e right join st_produto p on e.id_produto = p.id_produto
      where S_ATIVO = ${S_ATIVO}
      and p.S_NOME like '%'||${Search}||'%'
      and p.ID_PRODUTO = case when ${ID_PRODUTO} is null then p.ID_PRODUTO else ${ID_PRODUTO} end
      order by p.S_NOME
      limit ${parseInt(LimitPerPage)}
	    offset ${skip}
    `;

      return { data: produtosTabela, total };
    } catch (error) {}
  }
  async atualizarProd({
    data,
    ID_PRODUTO,
  }: {
    data: UpdateStProdutoDto;
    ID_PRODUTO: string;
  }) {
    const { S_NOME, S_ATIVO, ID_TIPO, N_SERIAL } = data;

    return this.prisma.sT_PRODUTO.update({
      data: {
        S_NOME,
        N_SERIAL,
        S_ATIVO: S_ATIVO ? 'S' : 'N',
        ID_TIPO: ID_TIPO ?? undefined,
      },
      where: {
        ID_PRODUTO,
      },
    });
  }
  async movimentacao() {
    const resposta = await this.prisma.sT_LOTE.findMany({
      select: {
        ID_LOTE: true,
        D_DATA_INICIO: true,
        ID_FORNECEDOR: true,
        ID_CLIENTE: true,
        ST_PRODUTO_LOTE: {
          select: {
            N_QUANTIDADE: true,
            ST_PRODUTO: {
              select: {
                S_NOME: true,
              },
            },
          },
        },
      },
    });

    // const viewMenorEstoque = await this.prisma.vw_menor_estoque
    //   .findMany({
    //     select: {
    //       ID_PRODUTO: true,
    //       QUANTIDADE: true,
    //       ST_PRODUTO: {
    //         select: {
    //           S_NOME: true,
    //         },
    //       },
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);

    //     return res;
    //   })
    //   .catch((err) => console.log(err));

    return resposta.reduce(
      (acc, data) => {
        const date = new Date(data.D_DATA_INICIO);
        const anoData = date.getFullYear().toString();

        const mesData = new Intl.DateTimeFormat('pt-BR', {
          month: 'long',
        }).format(date);
        let anoObj = acc.anos.find((ano) => ano.ano === anoData);

        if (!anoObj) {
          anoObj = { ano: anoData, entrada: 0, saida: 0, meses: [] };
          acc.anos.push(anoObj);
        }
        let mesObj = anoObj.meses.find((mes) => mes.name === mesData);

        if (!mesObj) {
          mesObj = { name: mesData, entrada: 0, saida: 0 };
          anoObj.meses.push(mesObj);
        }

        if (data.ID_FORNECEDOR) {
          data.ST_PRODUTO_LOTE.forEach((produtoLote) => {
            acc.itensEstoque += produtoLote.N_QUANTIDADE;
            mesObj.entrada += produtoLote.N_QUANTIDADE;
            anoObj.entrada += produtoLote.N_QUANTIDADE;
          });
        } else {
          data.ST_PRODUTO_LOTE.forEach((produtoLote) => {
            acc.itensEstoque -= produtoLote.N_QUANTIDADE;
            mesObj.saida += produtoLote.N_QUANTIDADE;
            anoObj.saida += produtoLote.N_QUANTIDADE;
          });
        }

        return acc;
      },
      {
        itensEstoque: 0,
        anos: [] as {
          ano: string;
          entrada: number;
          saida: number;
          meses: { name: string; entrada: number; saida: number }[];
        }[],
      },
    );
  }
}
