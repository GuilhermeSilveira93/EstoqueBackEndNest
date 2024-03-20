import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/usuarios')
  async todosOsUsuarios(@Res() res: FastifyReply) {
    res.status(202).send(await this.usuarioService.todosOsUsuarios());
  }
}
