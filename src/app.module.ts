import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './@env/env.module';
import { envSchema } from './@env/zod/env';
import { PrismaModule } from './@prisma/prisma.module';
import { UsuarioModule } from './http/routes/usuario/usuario.module';
@Module({
  imports: [
    EnvModule,
    UsuarioModule,
    PrismaModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
