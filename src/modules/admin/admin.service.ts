import { Injectable } from '@nestjs/common';
import { LoginAdminDto, RegisterAdminDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
  ) {}

  async login(dto: LoginAdminDto) {
    const { username, password } = dto;

    const admin = (
      await this.adminModel.findOne({ username }).exec()
    )?.toObject();

    if (!admin) throw new Error('User not found!');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid password!');

    delete admin.password;

    return admin;
  }

  async register(dto: RegisterAdminDto) {
    return (await (await this.adminModel.create(dto)).save())?.toObject();
  }
}
