import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDto {
  constructor(partial: Partial<UserCreateDto>) {
    Object.assign(this, partial);
  }
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
