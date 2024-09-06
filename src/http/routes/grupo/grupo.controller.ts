import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateGrupoDto } from './dto/create-grupo.dto';
import { GrupoService } from './grupo.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('grupo')
@UseGuards(AuthGuard('jwt'))
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Get()
  async getAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.grupoService.getAll();

      return res.status(202).send(consulta);
    } catch (error) {
      return res.status(404).send();
    }
  }
  @Post()
  async createGroup(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body as CreateGrupoDto;
    try {
      const resultado = await this.grupoService.createGroup(data);

      return res
        .status(202)
        .send({ message: 'GROUP.CREATESUCCESS', data: resultado });
    } catch (error) {
      return res.status(404).send();
    }
  }
}
