import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => {
      const secret: string = readFileSync(config.get('JWT_PRIVATE_KEY'), 'utf8');
      
      return {
        secret,
        signOptions: {
          expiresIn: config.get('JWT_EXPIRY'),
          issuer: config.get('JWT_ISSUER'),
          algorithm: config.get('JWT_ALGORITHM')
        }
      }
    },
    inject: [ConfigService]
  })],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
