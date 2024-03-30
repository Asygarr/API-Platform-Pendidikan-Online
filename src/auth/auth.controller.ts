import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register } from './dto/create-auth.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginUser, RegisterUser } from './entities/auth.entity';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered',
    type: RegisterUser,
  })
  register(@Body() Register: Register) {
    return this.authService.register(Register);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Login User', type: LoginUser })
  login(@Body() login: Login) {
    return this.authService.login(login);
  }
}
