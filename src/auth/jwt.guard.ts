import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//AuthGuard tem que ter o nome do que está em jwt-strategy.service.ts
//neste caso, jwt
export class JwtGuard extends AuthGuard('jwt') {}
