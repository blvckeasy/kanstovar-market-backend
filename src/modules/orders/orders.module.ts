import { Module } from '@nestjs/common';
import { OrdersService } from './services';
import { OrdersController } from './controllers';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
