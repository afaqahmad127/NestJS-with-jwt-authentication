import { UserLoginDto } from './../dto/user-login.dto';
import { UserCreateDto } from './../dto/user.dto';
import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local-guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signup(@Body() createUserDto: UserCreateDto) {
    return this.authService.signUp(createUserDto);
  }
}
