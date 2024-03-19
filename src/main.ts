import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const envService = app.get(EnvService);
  await app.register(fastifyCookie, {
    secret: envService.get('JWT_TOKEN'),
  });
  await app.register(helmet);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({ methods: '*' });

  await app
    .listen(envService.get('PORT'), '0.0.0.0')
    .then(() => console.log(`App rodando na porta`));
}
bootstrap();
