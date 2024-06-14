import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { TiposService } from './tipos.service';

@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.tiposService.findAll();

      return res.status(200).send(consulta);
    } catch (error) {
      return res.status(409);
    }
  }
}
