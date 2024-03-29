import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/connection/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUserTest() {
    await this.prisma.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async registerTest() {
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash('12345678', salt);

    await this.prisma.user.create({
      data: {
        name: 'test',
        username: 'test',
        email: 'test@example.com',
        password: hashPassword,
        role: 'instruktur',
      },
    });
  }
}
