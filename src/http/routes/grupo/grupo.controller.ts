import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { GrupoService } from './grupo.service';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const grupos = await this.grupoService.findAll();

      return res.status(202).send({ data: grupos });
    } catch (error) {
      return res.status(404).send();
    }
  }
}
