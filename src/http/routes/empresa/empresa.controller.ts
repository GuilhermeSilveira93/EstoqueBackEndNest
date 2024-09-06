import { Controller, Get, Res, Req, Patch, Post, UseGuards } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('empresa')
@UseGuards(AuthGuard('jwt'))
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async getAllWithParams(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.empresaService.getAllWithParams(req.query);

      return res.status(202).send(consulta);
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
   @Get('getAll')
  async getAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.empresaService.getAll();

      return res.status(202).send(consulta);
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
   @Post()
  async createEmpresa(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body as CreateEmpresaDto;
    try {
      await this.empresaService.createEmpresa(data);

      return res.status(202).send({ message: 'COMPANIE.CREATESUCCESS' });
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Patch(':ID_EMPRESA')
  async attEmpresa(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_EMPRESA: string };
    const data = req.body as UpdateEmpresaDto;
    try {
      await this.empresaService.attEmpresa({
        ID_EMPRESA: params.ID_EMPRESA,
        data,
      });

      return res
        .status(202)
        .send({ message: 'COMPANIE.ALTERSUCCESS' });
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
}
