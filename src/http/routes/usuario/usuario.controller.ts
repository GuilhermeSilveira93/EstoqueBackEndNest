import { Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateUserDTO } from './dto/create-usuario.dto';
import { FilterUserDto } from './dto/filter-usuario.dto';
import { UpdateUserDTO } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  async getAll(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const consulta = await this.usuarioService.getAll(
        req.query as FilterUserDto,
      );

      return res.status(202).send(consulta);
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Patch(':ID_USUARIO')
  async atualizarUsuario(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_USUARIO: string };
    const data = req.body as UpdateUserDTO;
    try {
      await this.usuarioService.updateUser({
        ID_USUARIO: params.ID_USUARIO,
        data,
      });

      return res
        .status(202)
        .send({ message: 'Usuario alterado com sucesso !' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post()
  async criarUsuario(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body as CreateUserDTO;
    try {
      const response = await this.usuarioService.createUser(data);

      return res
        .status(202)
        .send({ message: 'Usuario criado com sucesso !', data: response });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
}
