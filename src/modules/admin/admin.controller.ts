import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto, RegisterAdminDto } from './dto';
import { Admin } from './schemas';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() dto: LoginAdminDto): Promise<Admin | null> {
    return await this.adminService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterAdminDto): Promise<Admin> {
    const admin = await this.adminService.register(dto);

    delete admin.password;

    return admin;
  }
}
