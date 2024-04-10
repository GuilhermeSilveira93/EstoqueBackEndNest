import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './@env/env.module';
import { envSchema } from './@env/zod/env';
import { PrismaModule } from './@prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './http/routes/produto/produto.module';
import { UsuarioModule } from './http/routes/usuario/usuario.module';
@Module({
  imports: [
    EnvModule,
    UsuarioModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
