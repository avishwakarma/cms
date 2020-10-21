import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema, UserDocument} from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { toHash } from '../utils/helpers';

@Module({
  imports: [ MongooseModule.forFeatureAsync([{
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;
      // schema.pre('save', function(next: Function){
      //   let user = this as UserDocument;

      //   if(user.isModified('email')) {
      //     user.email = user.email.toLowerCase();
      //   }

      //   if(!user.isModified('password')) {
      //     return;
      //   }

      //   return toHash(user.password).then((hash: string) => user.password = hash);
      // })
      return schema;
    }
  }]) ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService]
})
export class UserModule {}