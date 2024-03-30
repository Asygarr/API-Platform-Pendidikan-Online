import { ApiProperty } from '@nestjs/swagger';

class Data {
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

export class Register {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: Data;
}

export class LoginUser {
  @ApiProperty()
  token: string;
}
