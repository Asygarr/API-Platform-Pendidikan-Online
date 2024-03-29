import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../connection/prisma.service';
import { JwtStartegy } from './strategy/jwt-strategy';

const configService = new ConfigService();

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStartegy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AuthModule {}
