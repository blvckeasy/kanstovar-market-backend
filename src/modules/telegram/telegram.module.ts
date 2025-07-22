import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { CustomerModule, CustomerService } from '../customer';

@Module({
  imports: [
    CustomerModule,
  ],
  controllers: [TelegramController],
  providers: [TelegramService, CustomerService],
})
export class TelegramModule {}
