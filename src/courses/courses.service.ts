import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateCourse } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../connection/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourse: CreateCourse, @Req() req: any) {
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
        updated_at: createCourses.updated_at,
      },
    };

    return responses;
  }

  findAll() {
    return `This action returns all courses`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
