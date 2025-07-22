import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe, ArgumentsHost } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { json } from 'body-parser';
import { TelegramService } from './modules';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
  });

  app.use(json());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/static/',
  });

  
  const telegramService = app.get(TelegramService);
  const configService = app.get(ConfigService);
  
  await telegramService.initBot();
  
  const bot = telegramService.getBot();
  const webhookURL = configService.get<string>('telegram.bot.webhookURL');

  await bot.api.setWebhook(webhookURL);

  app.useGlobalFilters({
    catch(exception: unknown, host: ArgumentsHost) {
      console.log(exception);

      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception instanceof Error ? exception.message : 'Internal server error',
      });
    },
  });
  
  await app.listen(process.env.PORT ?? 5000);

  console.log('Server is listening on *5000 port');
}

bootstrap();
