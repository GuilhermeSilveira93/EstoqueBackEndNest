import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './env/env.module';
import { envSchema } from './env/zod/env';
import { UsuarioModule } from './http/routes/usuario/usuario.module';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
