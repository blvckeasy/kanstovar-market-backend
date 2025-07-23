import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrderController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
