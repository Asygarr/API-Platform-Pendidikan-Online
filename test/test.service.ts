import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/connection/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  // Users
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

  // Courses
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

  // Modules
  async deleteModuleTest() {
    await this.prisma.modules.deleteMany({
      where: {
        title: {
          contains: 'test',
        },
      },
    });
  }

  async coursesIdForModuleTest() {
    const findInstruktur = await this.prisma.user.findFirst({
      where: {
        username: 'instruktur',
      },
    });

    const createCoursesTest = await this.prisma.courses.create({
      data: {
        title: 'test',
        description: 'test',
        instructor_id: findInstruktur.id,
      },
    });

    return createCoursesTest.id;
  }

  async createModule() {
    const coursesId = await this.coursesIdForModuleTest();

    const createModuleTest = await this.prisma.modules.create({
      data: {
        title: 'test',
        content: 'test',
        course_id: coursesId,
      },
    });

    return {
      coursesId,
      moduleId: createModuleTest.id,
    };
  }

  async createManyModule(courseId: string) {
    await this.prisma.modules.createMany({
      data: [
        {
          title: 'test 1',
          content: 'test 1',
          course_id: courseId,
        },
        {
          title: 'test 2',
          content: 'test 2',
          course_id: courseId,
        },
        {
          title: 'test 3',
          content: 'test 3',
          course_id: courseId,
        },
        {
          title: 'test 4',
          content: 'test 4',
          course_id: courseId,
        },
        {
          title: 'test 5',
          content: 'test 5',
          course_id: courseId,
        },
      ],
    });
  }

  async getModuleId(courseId: string) {
    const module1 = await this.prisma.modules.findFirst({
      where: {
        course_id: courseId,
      },
    });

    const module2 = await this.prisma.modules.findFirst({
      where: {
        course_id: courseId,
        id: {
          not: module1.id,
        },
      },
    });

    const module3 = await this.prisma.modules.findFirst({
      where: {
        course_id: courseId,
        id: {
          notIn: [module1.id, module2.id],
        },
      },
    });

    return {
      module1: module1.id,
      module2: module2.id,
      module3: module3.id,
    };
  }

  // Enrollment
  async deleteEnrollmentsTest() {
    await this.prisma.enrollments.deleteMany({
      where: {
        user_id: {
          not: {
            equals: 'wrong id test',
          },
        },
      },
    });
  }
}
