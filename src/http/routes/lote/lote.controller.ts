import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateLoteDto } from './dto/create-lote.dto';
import { LoteService } from './lote.service';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post(':ID_FORNECEDOR')
  async create(
    @Body() createLoteDto: CreateLoteDto,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const { ID_FORNECEDOR } = req.params as { ID_FORNECEDOR?: string };
    try {
      await this.loteService.create({ data: createLoteDto, ID_FORNECEDOR });
      res.send({ message: 'Lote inserido com sucesso!' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
}
