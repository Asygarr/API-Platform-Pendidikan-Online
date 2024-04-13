import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateCourse } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../connection/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourse: CreateCourse, req: any) {
    const { title, description } = createCourse;
    const instructor_id = req.user.id;

    if (!title || !description) {
      throw new HttpException(
        'Title or Description is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createCourses = await this.prisma.courses.create({
      data: {
        title: title,
        description: description,
        instructor_id,
      },
    });

    const responses = {
      message: 'Courses created successfully.',
      data: {
        id: createCourses.id,
        title: createCourses.title,
        description: createCourses.description,
        instructor_id: createCourses.instructor_id,
        cretaedAt: createCourses.cretaedAt,
      },
    };

    return responses;
  }

  async findAll() {
    const courses = await this.prisma.courses.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        instructor_id: true,
        cretaedAt: true,
      },
    });

    const response = {
      message: 'Courses retrieved successfully.',
      data: courses,
    };

    return response;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, req: any) {
    const { title, description } = updateCourseDto;
    const instructor_id = req.user.id;

    if (!title || !description) {
      throw new HttpException(
        'Title or Description is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cekCourse = await this.prisma.courses.findFirst({
      where: {
        id,
      },
    });

    if (!cekCourse) {
      throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);
    }

    if (cekCourse.instructor_id !== instructor_id) {
      throw new HttpException(
        'You are not authorized to update this course.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updateCourse = await this.prisma.courses.update({
      where: {
        id,
      },
      data: {
        title: title,
        description: description,
      },
    });

    const response = {
      message: 'Courses updated successfully.',
      data: {
        id: updateCourse.id,
        title: updateCourse.title,
        description: updateCourse.description,
        instructor_id: updateCourse.instructor_id,
        updatedAt: updateCourse.updatedAt,
      },
    };

    return response;
  }

  async remove(id: string, req: any) {
    const cekCourse = await this.prisma.courses.findUnique({
      where: {
        id,
      },
    });

    if (!cekCourse) {
      throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);
    }

    if (cekCourse.instructor_id !== req.user.id) {
      throw new HttpException(
        'You are not authorized to delete this course.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prisma.modules.deleteMany({
      where: {
        course_id: id,
      },
    });

    await this.prisma.enrollments.deleteMany({
      where: {
        course_id: id,
      },
    });

    await this.prisma.posts.deleteMany({
      where: {
        course_id: id,
      },
    });

    await this.prisma.courses.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Courses deleted successfully.',
    };
  }
}
