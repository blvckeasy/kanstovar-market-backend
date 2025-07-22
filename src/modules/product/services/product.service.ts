import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas';
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
  UpdateProductFilterDto,
} from '../dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(images_urls: string[], dto: CreateProductDto) {
    const created = new this.productModel({
      ...dto,
      images_urls,
    });
    return await created.save();
  }

  async findAll(filter: GetProductsDto) {
    const { search, name, category, brand } = filter;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    const products = await this.productModel
      .find(query)
      .populate('category')
      .exec();

    return products;
  }

  async update(filter: UpdateProductFilterDto, dto: UpdateProductDto) {
    const updatedProduct = await this.productModel
      .findOneAndUpdate(filter, dto, { new: true })
      .exec();

    return updatedProduct;
  }

  async findOne(id: string) {
    return this.productModel.findById(id).populate('category').exec();
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
