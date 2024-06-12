import { Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FilterUserDto } from './dto/filterUserDTO.dto';
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
    } catch (error) {
      return res.status(202).send({ message: error });
    }
  }
  @Patch(':ID_USUARIO')
  async atualizarUsuario(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const params = req.params as { ID_USUARIO: string };
    const data = req.body as UpdateUserDTO;
    await this.usuarioService.updateUser({
      ID_USUARIO: Number(params.ID_USUARIO),
      data,
    });

    return res.status(202).send({ message: 'Usuario alterado com sucesso !' });
  }
  @Post()
  async criarUsuario(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const data = req.body as UpdateUserDTO;
    await this.usuarioService.createUser({
      data,
    });

    return res.status(202).send({ message: 'Usuario alterado com sucesso !' });
  }
}
