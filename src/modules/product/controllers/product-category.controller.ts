import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'src/core';
import { ProductCategoryService } from '../services';
import {
  CreateProductCategoryDto,
  DeleteProductCategoryDto,
  GetProductCategoriesDto,
  UpdateProductCategoryDto,
} from '../dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductCategoryDto) {
    const newProduct = await this.productCategoryService.create(dto);
    return {
      message: 'Product successfully created',
      data: newProduct,
      error: null,
    };
  }

  @Patch()
  async update(@Body() dto: UpdateProductCategoryDto) {
    const updatedProduct = await this.productCategoryService.update(dto);
    return {
      message: 'Product successfully created',
      data: updatedProduct,
      error: null,
    };
  }

  @Delete()
  async remove(@Body() dto: DeleteProductCategoryDto) {
    const deletedProduct = await this.productCategoryService.remove(dto);
    return {
      message: 'Product successfully deleted',
      date: deletedProduct,
      error: null,
    };
  }

  @Get()
  async findAll(
    @Query() filter: GetProductCategoriesDto,
    @Query() pagination: Pagination,
  ) {
    const products = await this.productCategoryService.findAll(filter);

    const { page, limit } = pagination;
    const offset = page * limit - limit;

    return {
      message: 'Products successfully found',
      error: null,
      meta: {
        currentPage: page,
        limit: limit,
        pagesCount: Math.ceil(products.length / limit),
        dataCount: products.length,
      },
      data: products.slice(offset, limit),
    };
  }
}
