// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas';
import { Model } from 'mongoose';
import { CreateOrderDto, GetOrdersFilterDto } from '../dto';
import { OrderStatus } from 'src/core';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel({
      ...dto,
      status: OrderStatus.SENT,
    });
    return newOrder.save();
  }

  async findAll(filter: GetOrdersFilterDto): Promise<Order[]> {
    return await this.orderModel
      .find(filter)
      .populate('customer')
      .populate('products.product')
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('customer')
      .populate('products.product')
      .exec();

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async delete(id: string): Promise<void> {
    const res = await this.orderModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Order not found');
  }
}
