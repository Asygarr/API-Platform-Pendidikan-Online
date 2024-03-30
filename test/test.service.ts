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

  async deleteCoursesTest() {
    await this.prisma.courses.deleteMany({
      where: {
        title: {
          contains: 'test',
        },
      },
    });
  }

  async createCoursesTest() {
    const findInstruktur = await this.prisma.user.findFirst({
      where: {
        username: 'instruktur',
      },
    });

    const create = await this.prisma.courses.create({
      data: {
        title: 'test',
        description: 'test',
        instructor_id: findInstruktur.id,
      },
    });

    return create.id;
  }

  async createCoursesTestMany() {
    const findInstruktur = await this.prisma.user.findFirst({
      where: {
        username: 'instruktur',
      },
    });

    const findSiswa = await this.prisma.user.findFirst({
      where: {
        username: 'siswa',
      },
    });

    await this.prisma.courses.createMany({
      data: [
        {
          title: 'test',
          description: 'test',
          instructor_id: findInstruktur.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findInstruktur.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findInstruktur.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findInstruktur.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findInstruktur.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findInstruktur.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findSiswa.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findSiswa.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findSiswa.id,
        },
        {
          title: 'test',
          description: 'test',
          instructor_id: findSiswa.id,
        },
      ],
    });
  }
}
