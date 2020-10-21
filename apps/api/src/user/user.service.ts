import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUser } from './user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>){}

  async create(user: any): Promise<User> {
    console.log(user);
    const _user = new this.user(user);
    return _user.save();
  }

  async find(filter: any = {}): Promise<User[]> {
    return this.user.find(filter).exec();
  }

  async findOne(filter: any): Promise<User> {
    return this.user.findOne(filter).exec();
  }

  async findById(id: string): Promise<User> {
    return this.user.findById(id).exec();
  }
}