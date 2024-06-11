import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAllUserDto } from './dto/create-usuario.dto copy';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/criar')
  async createUser(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    res.status(202).send(await this.usuarioService.createUser());
  }
  @Get()
  async getAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.usuarioService.getAll(
        req.query as GetAllUserDto,
      );

      return res.status(202).send(consulta);
    } catch (error) {
      return res.status(202).send({ message: error });
    }
  }
}
