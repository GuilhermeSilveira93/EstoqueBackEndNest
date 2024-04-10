import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { FindProdutoDto } from './dto/findproduto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prismaService: PrismaService) {}
  async ViewProdutos(req: FindProdutoDto) {
    const { S_ATIVO = 'S', ID_PRODUTO } = req;

    return this.prismaService.$queryRaw`
      select "P"."ID_PRODUTO", "P"."S_NOME" PRODUTO, cast(case when "E"."QTD" is null then 0 else "E"."QTD" end as integer) QUANTIDADE
      from vw_estoque "E" right join st_produto "P" on "E"."ID_PRODUTO" = "P"."ID_PRODUTO"
      where "S_ATIVO" = case when ${S_ATIVO} = 'S' or ${S_ATIVO} = 'N' then ${S_ATIVO} else 'S' end
      and "P"."ID_PRODUTO" = case when cast(${Number(ID_PRODUTO)} as integer) is null then "P"."ID_PRODUTO" else cast(${ID_PRODUTO} as integer) end
      order by "P"."S_NOME"
    `;
  }
}
