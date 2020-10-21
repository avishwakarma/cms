import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private user: UserService, private jwt: JwtService) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.user.findOne({email});

    if(user && user.password === password) {
      const { password, ...rest} = user;
      
      return rest;
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {...user};
    
    return {
      access_token: this.jwt.sign(payload)
    }
  }

  async register(user: any): Promise<any> {
    return this.user.create(user);
  }
}
