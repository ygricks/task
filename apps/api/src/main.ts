import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DOUBLE_CSRF_TOKEN } from './auth/constants';
import cookieParser from 'cookie-parser';

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

  const { doubleCsrfProtection } = app.get(DOUBLE_CSRF_TOKEN);
  app.use(doubleCsrfProtection);

  const port: number = parseInt(process.env.PORT ?? '3000', 10);
  console.log(`Server is running on port ${port}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
