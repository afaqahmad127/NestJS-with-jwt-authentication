import { UserLoginDto } from './../dto/user-login.dto';
import { UserCreateDto } from './../dto/user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ResponseCode } from 'src/exceptions';
import { info } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(userLoginDto: UserLoginDto) {
    try {
      const user = await this.usersService.getUserByEmailAndPassword(
        userLoginDto,
      );
      if (user) {
        return {
          access_token: this.jwtService.sign({
            _id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
          }),
        };
      } else {
        throw new Error('Email or password is not valid!');
      }
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.NOT_FOUND);
    }
  }
  async signUp(user: UserCreateDto) {
    return this.usersService.createUser(user);
  }
}
