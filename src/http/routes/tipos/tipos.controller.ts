import { Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateTipoDto } from './dto/createtipo.dto';
import { FindTipoDto } from './dto/findtipo.dto';
import { UpdateTipoDto } from './dto/updatetipo.dto';
import { TiposService } from './tipos.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tipos')
@UseGuards(AuthGuard('jwt'))
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Get()
  async findWithParams(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.tiposService.findWithParams(
        req.query as FindTipoDto,
      );

      return res.status(200).send(consulta);
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Get('all')
  async findAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.tiposService.findAll();

      return res.status(200).send(consulta);
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Patch(':ID_TIPO')
  async atualizarUsuario(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_TIPO: string };
    const data = req.body as UpdateTipoDto;
    try {
      await this.tiposService.updateTipo({
        ID_TIPO: params.ID_TIPO,
        data,
      });

      return res.status(202).send({ message: 'TYPES.ALTERSUCCESS' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post()
  async createProd(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      await this.tiposService.createTipo(req.body as CreateTipoDto);

      return res.status(202).send({ message: 'TYPES.CREATESUCCESS' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
}
