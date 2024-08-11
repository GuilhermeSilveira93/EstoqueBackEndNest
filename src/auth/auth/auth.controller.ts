import { Controller, Post, Req, Res, UnauthorizedException, UsePipes } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { LoginDtoSchema, LoginDtoSchemaType } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @UsePipes(new ZodValidationPipe(LoginDtoSchema))
  @Post('login')
  async login(
    @Req() req: LoginDtoSchemaType,
    @Res() res: FastifyReply,
  ): Promise<{ data: { message: string; code: number; token: string } }> {
    try {
    const login = await this.authService.login(req);
    if (login.token) {
      return res.setCookie('token', login.token).code(202).send({
        token: login.token,
        message: login.message,
      });
    }
  } catch (error) {
    const _error = error as { message: string };
    return res.status(409).send({
      message: _error.message,
    });
  }
  }
}
