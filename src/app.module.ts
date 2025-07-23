import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminModule,
  CustomerModule,
  TelegramModule,
  ProductModule,
  OrderModule,
} from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { configuration } from './core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'environments', `.env.${process.env.NODE_ENV}`),
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb_connection_url'),
      }),
      inject: [ConfigService],
    }),

    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
      }),
      inject: [ConfigService]
    }),

    AdminModule,
    CustomerModule,
    OrderModule,
    ProductModule,
    TelegramModule,
  ],
})
export class AppModule {}
