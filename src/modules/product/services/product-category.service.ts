import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCategory, ProductDocument } from '../schemas';
import {
  CreateProductCategoryDto,
  DeleteProductCategoryDto,
  GetProductCategoriesDto,
  UpdateProductCategoryDto,
} from '../dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductCategoryDto) {
    const productCategoryDocument = new this.productCategoryModel(dto);
    const newProductCategory = await productCategoryDocument.save();

    return newProductCategory;
  }

  async update(dto: UpdateProductCategoryDto) {
    const { _id, ...update } = dto;
    const updatedProductCategory = await this.productCategoryModel
      .findByIdAndUpdate(_id, update, { new: true })
      .exec();

    return updatedProductCategory;
  }

  async remove(dto: DeleteProductCategoryDto) {
    const deletedProductCategory =
      await this.productCategoryModel.findOneAndDelete(dto);
    return deletedProductCategory;
  }

  async findAll(filter: GetProductCategoriesDto) {
    const { search } = filter;
    const query: any = {};

    if (search) {
      query.$or = [
        { name_uz: { $regex: search, $options: 'i' } },
        { name_ru: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await this.productCategoryModel.find(query).exec();
    return products;
  }
}
