import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { ProdutosTabela } from '@/@types/ProdutosTabela';
import { Injectable } from '@nestjs/common';

import { FindProdutoDto } from './dto/findproduto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prismaService: PrismaService) {}
  async ViewProdutos(req: FindProdutoDto): Promise<ProdutosTabela[]> {
    const { S_ATIVO = 'S', ID_PRODUTO, Search = '' } = req;
    try {
      const teste: ProdutosTabela[] = await this.prismaService.$queryRaw`
      select "P"."ID_PRODUTO", "P"."S_NOME" PRODUTO, cast(case when "E"."QTD" is null then 0 else "E"."QTD" end as integer) QUANTIDADE
      from vw_estoque "E" right join st_produto "P" on "E"."ID_PRODUTO" = "P"."ID_PRODUTO"
      where "S_ATIVO" = ${S_ATIVO}
      and "P"."S_NOME" like '%'||${Search}||'%'
      and "P"."ID_PRODUTO" = case when cast(${Number(ID_PRODUTO)} as integer) is null then "P"."ID_PRODUTO" else cast(${ID_PRODUTO} as integer) end
      order by "P"."S_NOME"
    `;

      return teste;
    } catch (error) {
      console.log(error);
    }
  }
}
