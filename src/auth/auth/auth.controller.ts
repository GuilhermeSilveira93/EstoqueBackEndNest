import { Controller, Post, Req, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Req() req: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<{ data: { message: string; code: number; token: string } }> {
    const login = await this.authService.login(req);

    if (login.token) {
      return res.setCookie('token', login.token).code(202).send({
        token: login.token,
        message: login.message,
      });
    }

    return res.code(409).send({
      message: login.message,
    });
  }
}
