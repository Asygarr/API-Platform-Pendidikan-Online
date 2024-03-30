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
