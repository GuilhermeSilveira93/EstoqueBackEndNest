import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './@env/env.module';
import { envSchema } from './@env/zod/env';
import { PrismaModule } from './@prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GrupoModule } from './http/routes/grupo/grupo.module';
import { ProdutoModule } from './http/routes/produto/produto.module';
import { UsuarioModule } from './http/routes/usuario/usuario.module';
@Module({
  imports: [
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsuarioModule,
    ProdutoModule,
    GrupoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
