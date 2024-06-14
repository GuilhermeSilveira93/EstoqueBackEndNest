import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { ProdutosTabela } from '@/@types/ProdutosTabela';
import { Injectable } from '@nestjs/common';

import { TypesProdutoDto } from './dto/create-st_produto.dto';
import { FindProdutoDto } from './dto/findproduto.dto';
import { UpdateStProdutoDto } from './dto/update-st_produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}
  async createProd(req: TypesProdutoDto) {
    const { S_NOME, ID_TIPO, N_SERIAL } = req;
    await this.prisma.st_produto.create({
      data: {
        S_NOME,
        ID_TIPO,
        N_SERIAL,
      },
    });
  }
  async produtos(req: FindProdutoDto) {
    const { S_ATIVO = 'S', ID_PRODUTO } = req;

    const total = await this.prisma.st_produto.count({
      where: {
        S_ATIVO,
        ID_PRODUTO: ID_PRODUTO ? Number(ID_PRODUTO) : undefined,
      },
    });

    const produtos = await this.prisma.st_produto.findMany({
      where: {
        S_ATIVO,
        ID_PRODUTO: ID_PRODUTO ? Number(ID_PRODUTO) : undefined,
      },
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
      const total = await this.prisma.st_produto.count({
        where: {
          S_ATIVO,
        },
      });

      const produtosTabela: ProdutosTabela[] = await this.prisma.$queryRaw`
      select p.ID_PRODUTO, p.S_NOME PRODUTO, case when e.quantidade is null then 0 else e.quantidade end QUANTIDADE, p.S_ATIVO
      from vw_estoque e right join st_produto p on e.id_produto = p.id_produto
      where S_ATIVO = ${S_ATIVO}
      and p.S_NOME like '%'||${Search}||'%'
      and p.ID_PRODUTO = case when ${ID_PRODUTO} is null then p.ID_PRODUTO else ${ID_PRODUTO} end
      order by p.S_NOME
      limit ${parseInt(LimitPerPage)}
	    offset ${Number(Page) * parseInt(LimitPerPage)}
    `;

      return { data: produtosTabela, total };
    } catch (error) {}
  }
  async atualizarProd(req: UpdateStProdutoDto) {
    const { ID_PRODUTO, S_NOME, S_ATIVO } = req;

    return this.prisma.st_produto.update({
      where: {
        ID_PRODUTO,
      },
      data: {
        S_NOME,
        S_ATIVO: S_ATIVO ? 'S' : 'N',
      },
    });
  }
  async movimentacao() {
    const resposta = await this.prisma.st_lote.findMany({
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

    const viewMenorEstoque = await this.prisma.vw_menor_estoque
      .findMany({
        select: {
          ID_PRODUTO: true,
          QUANTIDADE: true,
          ST_PRODUTO: {
            select: {
              S_NOME: true,
            },
          },
        },
      })
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => console.log(err));

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
