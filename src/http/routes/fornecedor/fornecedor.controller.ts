import { Controller, Get, Res, Req } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FornecedorService } from './fornecedor.service';
@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.fornecedorService.findAll(req.query);

      return res.status(202).send(consulta);
    } catch (error) {
      return res.status(404);
    }
  }
}
