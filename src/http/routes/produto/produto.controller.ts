import { Controller, Get, Req, Res, Patch } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UpdateStProdutoDto } from './dto/update-st_produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('tabela')
  async ViewEstoque(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const totalProd = await this.produtoService.TotalProd(req.query);

      const produtos = await this.produtoService.ViewProdutos(req.query);

      return res.status(200).send({ data: produtos, total: totalProd });
    } catch (error) {
      return res.status(409);
    }
  }
  @Get('movimentacao')
  async Movimentacao(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const movimentacao = await this.produtoService.movimentacao();

      return res.code(202).send(movimentacao);
    } catch (error) {}
  }
  @Patch()
  async atualizarProd(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      await this.produtoService.atualizarProd(req.body as UpdateStProdutoDto);

      return res
        .status(202)
        .send({ message: 'Produto alterado com sucesso !' });
    } catch (error) {
      return res.status(202).send({ message: error });
    }
  }
}
