import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, GetCustomerDto } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from '../schemas';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(dto: CreateCustomerDto) {
    const docuemnt = await this.customerModel.create(dto);
    const newCustomer = docuemnt.save();
    return newCustomer;
  }

  async getAll(filter: GetCustomerDto) {
    const customers = await this.customerModel.find(filter).exec();
    return customers;
  }
}
