import { Controller, Get, UseGuards } from '@nestjs/common';

import { User } from './user.schema';
import { UserService } from './user.service';
import { LocalGuard } from '../auth/local.guard';

@Controller('users')
export class UserController {

  constructor(private user: UserService){}

  @Get('/')
  async all(): Promise<User[]> {
    return this.user.find();
  }

  @UseGuards(LocalGuard)
  @Get('/protected')
  async one(): Promise<User> {
    return this.user.findOne({email: 'akvlko@gmail.com'});
  }
}