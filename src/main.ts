import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  HttpException,
  HttpStatus,
  BadRequestException,
  ArgumentsHost,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { json } from 'body-parser';
import { TelegramService } from './modules';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
  });

  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  });

  app.use(json());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorObject = validationErrors.reduce((acc, error) => {
          const message = Object.values(error.constraints)
            .map((constraint) =>
              constraint === 'isNumber'
                ? 'Bu maydon raqam bo‘lishi kerak'
                : constraint === 'isNotEmpty'
                  ? 'Bu maydon bo‘sh bo‘lmasligi kerak'
                  : constraint,
            )
            .join(', ');
          acc[error.property] = message;
          return acc;
        }, {});

        return new BadRequestException({
          data: null,
          error: errorObject,
        });
      },
    }),
  );

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
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      // const request = ctx.getRequest();

      if (exception instanceof BadRequestException) {
        // ValidationPipe dan kelgan xato
        const exceptionResponse = exception.getResponse();
        response.status(HttpStatus.BAD_REQUEST).json(exceptionResponse);
      } else {
        // Boshqa xatolar uchun
        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
          data: null,
          error: {
            message:
              exception instanceof Error
                ? exception.message
                : 'Internal server error',
          },
        });
      }
    },
  });

  await app.listen(process.env.PORT ?? 5000);
  console.log('Server is listening on *5000 port');
}

bootstrap();
