import { EnvService } from '@/@env/env.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as zod from 'zod';
const tokenSchema = zod.object({
  sub: zod.string().uuid(),
  ID_USUARIO: zod.string().uuid(),
  S_NOME: zod.string(),
  ID_GRUPO: zod.string().uuid(),
  st_grupo: zod.object({
    N_NIVEL: zod.number(),
  }),
});
type tokenSchemaType = zod.infer<typeof tokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      secretOrKey: Buffer.from(publicKey, 'base64'),
    });
  }
  async validate(payload: tokenSchemaType) {
    return tokenSchema.parse(payload);
  }
}
