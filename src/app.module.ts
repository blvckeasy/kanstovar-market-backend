import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminModule,
  CustomerModule,
  TelegramModule,
  ProductModule,
  OrdersModule,
} from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { configuration } from './core';

console.log(join(process.cwd(), 'environments', `.env.${process.env.NODE_ENV}`));

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

    AdminModule,
    CustomerModule,
    OrdersModule,
    ProductModule,
    TelegramModule,
  ],
})
export class AppModule {}
