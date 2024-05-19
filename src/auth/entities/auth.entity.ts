import { ApiProperty } from '@nestjs/swagger';

class DataAuth {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAt: Date;
}

export class RegisterUser {
  @ApiProperty({ example: 'User registered successfully.' })
  message: string;

  @ApiProperty()
  data: DataAuth;
}

export class LoginUser {
  @ApiProperty({ example: 'JWT Token' })
  token: string;
}

export class RefreshToken {
  @ApiProperty({ example: 'JWT Refresh Token' })
  token: string;
}

export class Logout {
  @ApiProperty({ example: 'Logout successfully.' })
  message: string;
}
