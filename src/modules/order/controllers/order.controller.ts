import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from '../services';
import { CreateOrderBodyDto, GetOrdersFilterDto } from '../dto';
import { OrderStatus } from 'src/core';
import { JwtService } from '@nestjs/jwt';
import { ICustomer } from 'src/core/shared/interfaces/customer';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Headers('authorization') authHeader: string,
    @Body() dto: CreateOrderBodyDto,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    const customer = (await this.jwtService.verifyAsync(token)) as ICustomer;

    return await this.orderService.createOrder({
      customer: customer._id,
      ...dto,
    });
  }

  @Get()
  findAll(@Query() filter: GetOrdersFilterDto) {
    return this.orderService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: OrderStatus) {
    console.log(id);
    console.log(status);

    return this.orderService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
