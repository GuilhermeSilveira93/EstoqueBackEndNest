import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './@env/zod/env';
import { PrismaModule } from './@prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './http/routes/empresa/empresa.module';
import { FornecedorModule } from './http/routes/fornecedor/fornecedor.module';
import { GrupoModule } from './http/routes/grupo/grupo.module';
import { ProdutoModule } from './http/routes/produto/produto.module';
import { TiposModule } from './http/routes/tipos/tipos.module';
import { UsuarioModule } from './http/routes/usuario/usuario.module';
import { ClienteModule } from './http/routes/cliente/cliente.module';
import { LoteModule } from './http/routes/lote/lote.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsuarioModule,
    ProdutoModule,
    GrupoModule,
    TiposModule,
    EmpresaModule,
    FornecedorModule,
    ClienteModule,
    LoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
