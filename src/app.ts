import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { EnvService } from './@env/env.service';
import { AppModule } from './app.module';

export const Server = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const envService = app.get(EnvService);
  const port = envService.get('PORT')
  await app.register(fastifyCookie, {
    secret: envService.get('JWT_PRIVATE_KEY'),
  });
  await app.register(helmet);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  await app
    .listen(port, '0.0.0.0')
    .then(() => console.log(`App rodando na porta ${port}`));
};
