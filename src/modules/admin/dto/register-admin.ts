import { IsString } from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
