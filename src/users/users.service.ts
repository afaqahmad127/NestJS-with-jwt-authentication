import { UserLoginDto } from './../dto/user-login.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Module,
} from '@nestjs/common';
import { UserCreateDto } from 'src/dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/schemas/user.schema';
import { ResponseCode } from 'src/exceptions';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}
  async createUser(userCreateDto: UserCreateDto) {
    try {
      const user = await this.userModel.findOne({ email: userCreateDto.email });
      if (user) {
        throw new Error(`User Exists with email: ${user.email}`);
      }
      return await this.userModel.create(userCreateDto);
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.ALREADY_EXIST);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneb(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findOne(username: string): Promise<UsersDocument> {
    return await this.userModel.findOne({ email: username });
  }
  async getUserByEmailAndPassword(
    userLoginDto: UserLoginDto,
  ): Promise<UsersDocument> {
    return await this.userModel.findOne({
      email: userLoginDto.email,
      password: userLoginDto.password,
    });
  }
}
