import { Module } from '@nestjs/common';
import { ProductController, ProductCategoryController } from './controllers';
import { ProductCategoryService, ProductService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
  ProductCategory,
  ProductCategorySchema,
} from './schemas';
import { FileService } from 'src/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductCategory.name, schema: ProductCategorySchema },
    ]),
  ],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductService, ProductCategoryService, FileService],
})
export class ProductModule {}
