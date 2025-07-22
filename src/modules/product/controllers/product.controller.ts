import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  Patch,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
  UpdateProductFilterDto,
} from '../dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/services';
import { Pagination } from 'src/core';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: CreateProductDto,
  ) {
    console.log(dto);

    const images_urls: string[] =
      await this.fileService.uploadProductImages(images);

    return this.productService.create(images_urls, dto);
  }

  @Patch(':_id')
  async update(
    @Param() filter: UpdateProductFilterDto,
    @Body() dto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(filter, dto);
    return {
      message: 'Product successfully updated',
      data: updatedProduct,
      error: null,
    };
  }

  @Get()
  async findAll(
    @Query() filter: GetProductsDto,
    @Query() pagination: Pagination,
  ) {
    const products = await this.productService.findAll(filter);

    const { page, limit } = pagination;
    const offset = page * limit - limit;

    return {
      message: 'Productlar topildi',
      meta: {
        currentPage: page,
        limit: limit,
        pagesCount: Math.ceil(products.length / limit),
        dataCount: products.length,
      },
      data: products.slice(offset, limit),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.productService.remove(id);

    return {
      message: 'Product is deleted',
      data: deletedProduct,
      error: null,
    };
  }
}
