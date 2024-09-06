import { Controller, Get, Res, Req, Patch, Post, UsePipes, UseGuards} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ClienteService } from './cliente.service';
import { CreateClienteSchema } from './dto/create-cliente.dto';
import { FindClienteDto } from './dto/findCliente.dto';
import { UpdateClienteSchema } from './dto/update-cliente.dto';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('cliente')
@UseGuards(AuthGuard('jwt'))
export class ClienteController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly clienteService: ClienteService) {}
  @Get()
  async getAllWithParams(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data: FindClienteDto = req.query;
    try {
      const consulta = await this.clienteService.getAllWithParams(data);

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
    const data: FindClienteDto = req.query;
    try {
      const consulta = await this.clienteService.getAllWithParams(data);

      return res.status(202).send(consulta);
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Get(':ID_EMPRESA')
  async findForCompany(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_EMPRESA: string };
    try {
      const consulta = await this.clienteService.findForCompany(params.ID_EMPRESA);
      return res.status(202).send(consulta);
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post()
  @UsePipes(new ZodValidationPipe(CreateClienteSchema))
  async createCliente(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body;
    try {
      await this.clienteService.createCliente(data);

      return res.status(202).send({ message: 'CLIENTE.CREATESUCCESS' });
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Patch(':ID_CLIENTE')
  @UsePipes(new ZodValidationPipe(UpdateClienteSchema))
  async attEmpresa(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_CLIENTE: string };
    const data = req.body;
    try {
      await this.clienteService.attCliente({
        ID_CLIENTE: params.ID_CLIENTE,
        data,
      });

      return res
        .status(202)
        .send({ message: 'CLIENTE.ALTERSUCCESS' });
    } catch (error) {
      const _error = error as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
}
