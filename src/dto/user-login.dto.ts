import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
