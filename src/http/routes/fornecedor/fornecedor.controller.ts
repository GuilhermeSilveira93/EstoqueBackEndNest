import { Controller, Get, Res, Req, Patch, Post } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { FornecedorService } from './fornecedor.service';
@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  /* @Get()
  async findAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.fornecedorService.findAll(req.query);

      return res.status(202).send(consulta);
    } catch (error) {
      return res.status(404);
    }
  }
  @Patch(':ID_FORNECEDOR')
  async editFornecedor(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_FORNECEDOR: string };
    const data = req.body as UpdateFornecedorDto;
    console.log('data');
    console.log(data);
    try {
      await this.fornecedorService.editFornecedor({
        ID_FORNECEDOR: Number(params.ID_FORNECEDOR),
        data,
      });

      return res
        .status(202)
        .send({ message: 'Fornecedor atualizado com sucesso!' });
    } catch (error) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post()
  async createFornecedor(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      await this.fornecedorService.createFornecedor(
        req.body as CreateFornecedorDto,
      );

      return res
        .status(202)
        .send({ message: 'Fornecedor criado com sucesso!' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  } */
}
