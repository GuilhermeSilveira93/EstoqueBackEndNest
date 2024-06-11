import { Controller, Post, Request, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/usuarios')
  async createUser(@Request() req: FastifyRequest, @Res() res: FastifyReply) {
    res.status(202).send(await this.usuarioService.createUser());
  }
}
