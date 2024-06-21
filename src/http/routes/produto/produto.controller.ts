import { Controller, Get, Req, Res, Patch, Post } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateProdutoDTO } from './dto/create-st_produto.dto';
import { FindProdutoDto } from './dto/findproduto.dto';
import { UpdateStProdutoDto } from './dto/update-st_produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}
  @Post()
  async createProd(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      await this.produtoService.createProd(req.body as CreateProdutoDTO);

      return res.status(202).send({ message: 'Produto criado com sucesso!' });
    } catch (err) {
      console.log(err);

      return res.status(409).send({
        message: err,
      });
    }
  }
  @Get()
  async produtos(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.produtoService.produtos(req.query);

      return res.status(200).send(consulta);
    } catch (err) {
      console.log(err);

      return res.status(409).send({
        message: err,
      });
    }
  }
  @Get('tabela')
  async ViewEstoque(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.produtoService.viewProdutos(
        req.query as FindProdutoDto,
      );

      return res.status(200).send(consulta);
    } catch (err) {
      console.log(err);

      return res.status(409).send({
        message: err,
      });
    }
  }
  @Get('movimentacao')
  async Movimentacao(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const movimentacao = await this.produtoService.movimentacao();

      return res.code(202).send(movimentacao);
    } catch (err) {
      console.log(err);

      return res.status(409).send({
        message: err,
      });
    }
  }
  @Patch(':ID_PRODUTO')
  async atualizarProd(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_PRODUTO: string };
    const data = req.body as UpdateStProdutoDto;
    try {
      await this.produtoService.atualizarProd({
        data,
        ID_PRODUTO: Number(params.ID_PRODUTO),
      });

      return res
        .status(202)
        .send({ message: 'Produto alterado com sucesso !' });
    } catch (err) {
      console.log(err);

      return res.status(409).send({
        message: err,
      });
    }
  }
}
