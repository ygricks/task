import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(resolve(__dirname, '../secrets/key.pem')),
    cert: readFileSync(resolve(__dirname, '../secrets/cert.pem')),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
