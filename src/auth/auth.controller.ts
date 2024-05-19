import { Controller, Post, Body, Res, Get, Req, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register } from './dto/create-auth.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginUser,
  Logout,
  RefreshToken,
  RegisterUser,
} from './entities/auth.entity';
import { Response } from 'express';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered',
    type: RegisterUser,
  })
  async register(@Body() Register: Register) {
    return this.authService.register(Register);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Login User', type: LoginUser })
  async login(@Body() login: Login, @Res() res: Response) {
    const response = await this.authService.login(login);

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.json({
      token: response.token,
    });
  }

  @Get('refresh-token')
  @ApiOkResponse({ description: 'Refresh Token', type: RefreshToken })
  async refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @Delete('logout')
  @ApiOkResponse({ description: 'Logout', type: Logout })
  async logout(@Req() req: Request, @Res() res: Response) {
    const response = await this.authService.logout(req);

    res.clearCookie('refreshToken');

    res.json({
      message: response.message,
    });
  }
}
