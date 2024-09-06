import { EnvModule } from '@/@env/env.module';
import { EnvService } from '@/@env/env.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => {
        const privateKey = envService.get('JWT_PRIVATE_KEY')
        const publicKey = envService.get('JWT_PUBLIC_KEY')
        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey :Buffer.from(publicKey, 'base64'),
          key: publicKey,
          signOptions: { expiresIn: '6 days', algorithm: 'RS256' }
        }
      }
    }),
  ],
    controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EnvService],
})
export class AuthModule {}
