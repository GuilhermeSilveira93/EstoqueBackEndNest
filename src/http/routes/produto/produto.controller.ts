import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('tabela')
  async ViewEstoque(@Res() res: FastifyReply, @Req() req: FastifyRequest) {
    await this.produtoService
      .ViewProdutos(req.query)
      .then((response) => {
        res.status(202).send({ data: response });
      })
      .catch(() => {
        res.status(204).send({ data: [] });
      });
  }
}
