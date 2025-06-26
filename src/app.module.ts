import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/kanstovar'),
    ProductModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
