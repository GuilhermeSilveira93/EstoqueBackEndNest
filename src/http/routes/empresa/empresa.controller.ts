import { Controller, Get, Res, Req } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.empresaService.findAll(req.query);

      return res.status(202).send(consulta);
    } catch (error) {
      return res.status(404);
    }
  }
}
