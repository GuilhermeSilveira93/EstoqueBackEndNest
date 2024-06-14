import { Controller, Get, Req, Res, Patch, Post } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { TypesProdutoDto } from './dto/create-st_produto.dto';
import { UpdateStProdutoDto } from './dto/update-st_produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}
  @Post()
  async createProd(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.produtoService.createProd(
        req.query as TypesProdutoDto,
      );

      return res.status(200).send(consulta);
    } catch (error) {
      return res.status(409);
    }
  }
  @Get()
  async produtos(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.produtoService.produtos(req.query);

      return res.status(200).send(consulta);
    } catch (error) {
      return res.status(409);
    }
  }
  @Get('tabela')
  async ViewEstoque(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.produtoService.viewProdutos(req.query);

      return res.status(200).send(consulta);
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
