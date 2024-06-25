import { Controller, Get, Res, Req, Patch, Post } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
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
      return res.status(204).send({ message: 'Algo deu errado!' });
    }
  }
  @Post()
  async createEmpresa(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body as CreateEmpresaDto;
    try {
      await this.empresaService.createEmpresa(data);

      return res.status(202).send({ message: 'Empresa criada com sucesso !' });
    } catch (error) {
      return res.status(204).send({ message: 'Algo deu errado!' });
    }
  }
  @Patch(':ID_EMPRESA')
  async attEmpresa(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_EMPRESA: string };
    const data = req.body as UpdateEmpresaDto;
    try {
      await this.empresaService.attEmpresa({
        ID_EMPRESA: Number(params.ID_EMPRESA),
        data,
      });

      return res
        .status(202)
        .send({ message: 'Empresa alterado com sucesso !' });
    } catch (error) {
      return res.status(409).send({ message: 'Algo deu errado!' });
    }
  }
}
