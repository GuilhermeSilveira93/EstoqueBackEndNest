import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('tabela')
  async ViewEstoque(@Res() res: FastifyReply, @Req() req: FastifyRequest) {
    const totalProd = await this.produtoService.TotalProd(req.query);
    await this.produtoService
      .ViewProdutos(req.query)
      .then((response) => {
        if (response) {
          res.status(202).send({ data: response, total: totalProd });
        }
        res.status(204).send({ data: [], total: 0 });
      })
      .catch(() => {
        res.status(204).send({ data: [], total: 0 });
      });
  }
}
