import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), MongooseModule.forRootAsync({
   imports: [ ConfigModule ],
   useFactory: async (configService: ConfigService) => {
     const HOST: string = configService.get('DATABASE_HOST'),
      USER: string = configService.get('DATABASE_USER'),
      PASSWORD: string = configService.get('DATABASE_PASSWORD'),
      DATABASE: string = configService.get('DATABASE_NAME');
      return {
        uri: `mongodb+srv://${USER}:${encodeURIComponent(PASSWORD)}@${HOST}/${DATABASE}`
      }
   },
   inject: [ConfigService]
  }), UserModule, AuthModule],
  providers: [ConfigService],
})
export class AppModule {}
