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
      select "P"."ID_PRODUTO", "P"."S_NOME" PRODUTO, cast(case when "E"."QTD" is null then 0 else "E"."QTD" end as integer) QUANTIDADE, "P"."S_ATIVO"
      from vw_estoque "E" right join st_produto "P" on "E"."ID_PRODUTO" = "P"."ID_PRODUTO"
      where "S_ATIVO" = ${S_ATIVO}
      and "P"."S_NOME" like '%'||${Search}||'%'
      and "P"."ID_PRODUTO" = case when cast(${Number(ID_PRODUTO)} as integer) is null then "P"."ID_PRODUTO" else cast(${ID_PRODUTO} as integer) end
      order by "P"."S_NOME"
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
}
