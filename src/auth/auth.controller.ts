import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register } from './dto/create-auth.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: Register,
  })
  register(@Body() Register: Register) {
    return this.authService.register(Register);
  }

  @Post('login')
  login(@Body() login: Login) {
    return this.authService.login(login);
  }
}
