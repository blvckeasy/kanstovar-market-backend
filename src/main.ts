import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/static/',
  });

  await app.listen(process.env.PORT ?? 5000);

  console.log('Server is listening on *5000 port');
}
bootstrap();
