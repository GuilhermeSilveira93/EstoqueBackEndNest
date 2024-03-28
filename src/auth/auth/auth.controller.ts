import { Controller, Post, Request, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Request() req: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<{ data: { message: string; code: number } }> {
    const login = await this.authService.login(req);
    console.log('tentando login');

    if (login.token) {
      return res.setCookie('token', login.token).send({
        message: login.message,
        code: 202,
      });
    }

    return res.code(409).send({
      message: login.message,
      code: 409,
    });
  }
}
