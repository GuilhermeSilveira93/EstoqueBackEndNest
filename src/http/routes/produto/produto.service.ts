import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { ProdutosTabela } from '@/@types/ProdutosTabela';
import { Injectable } from '@nestjs/common';

import { FindProdutoDto } from './dto/findproduto.dto';
import { UpdateStProdutoDto } from './dto/update-st_produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prismaService: PrismaService) {}
  async ViewProdutos(req: FindProdutoDto): Promise<ProdutosTabela[]> {
    const {
      S_ATIVO = 'S',
      ID_PRODUTO,
      Search = '',
      Page = '0',
      LimitPerPage = '10',
    } = req;

    try {
      const teste: ProdutosTabela[] = await this.prismaService.$queryRaw`
      select p.ID_PRODUTO, p.S_NOME PRODUTO, case when e.quantidade is null then 0 else e.quantidade end QUANTIDADE, P.S_ATIVO
      from vw_estoque e right join st_produto p on e.id_produto = p.id_produto
      where S_ATIVO = ${S_ATIVO}
      and P.S_NOME like '%'||${Search}||'%'
      and P.ID_PRODUTO = case when ${ID_PRODUTO} is null then P.ID_PRODUTO else ${ID_PRODUTO} end
      order by P.S_NOME
      limit ${parseInt(LimitPerPage)}
	    offset ${Number(Page) * parseInt(LimitPerPage)}
    `;

      return teste;
    } catch (error) {}
  }
  async TotalProd(req: FindProdutoDto) {
    const { S_ATIVO = 'S' } = req;

    return await this.prismaService.st_produto.count({
      where: {
        S_ATIVO,
      },
    });
  }
  async atualizarProd(req: UpdateStProdutoDto) {
    const { ID_PRODUTO, S_NOME, S_ATIVO } = req;

    return this.prismaService.st_produto.update({
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
    const resposta = await this.prismaService.st_lote.findMany({
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

    const viewMenorEstoque = await this.prismaService.vw_menor_estoque
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
