import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateGrupoDto } from './dto/create-grupo.dto';
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
  @Post()
  async createGroup(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body as CreateGrupoDto;
    try {
      const resultado = await this.grupoService.createGroup(data);

      return res
        .status(202)
        .send({ message: 'Grupo Criado com sucesso', data: resultado });
    } catch (error) {
      return res.status(404).send();
    }
  }
}
