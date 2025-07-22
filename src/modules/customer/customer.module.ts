import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers';
import { CustomerService } from './services';
import { Customer, CustomerSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [MongooseModule],
})
export class CustomerModule {}
