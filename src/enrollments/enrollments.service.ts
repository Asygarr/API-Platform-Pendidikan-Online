import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { PrismaService } from '../connection/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEnrollment(createEnrollmentDto: CreateEnrollmentDto, req: any) {
    const { course_id } = createEnrollmentDto;
    const student_id = req.user.id;

    const cekCourse = await this.prisma.courses.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!cekCourse) {
      throw new HttpException('Invalid course id', HttpStatus.BAD_REQUEST);
    }

    const cekEnrollment = await this.prisma.enrollments.findFirst({
      where: {
        course_id,
        user_id: student_id,
      },
    });

    if (cekEnrollment) {
      throw new HttpException(
        'You already enrolled in this course.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createEnrollment = await this.prisma.enrollments.create({
      data: {
        user_id: student_id,
        course_id: course_id,
        progress: 0,
      },
    });

    const response = {
      message: 'Enrollment created successfully.',
      data: {
        id: createEnrollment.id,
        course_id: createEnrollment.course_id,
        user_id: createEnrollment.user_id,
        progress: createEnrollment.progress,
      },
    };

    return response;
  }

  async getAllEnrollments() {
    const enrollments = await this.prisma.enrollments.findMany({
      select: {
        id: true,
        user_id: true,
        course_id: true,
        progress: true,
      },
    });

    const response = {
      message: 'Enrollments retrieved successfully.',
      data: enrollments,
    };

    return response;
  }

  async updateProgress(
    enrollmentId: string,
    req: any,
    updateEnrollmentDto: string[],
  ) {
    const completedModules = updateEnrollmentDto;
    const student_id = req.user.id;

    const cekEnrollment = await this.prisma.enrollments.findUnique({
      where: {
        id: enrollmentId,
      },
    });

    if (!cekEnrollment) {
      throw new HttpException('Invalid enrollment id', HttpStatus.BAD_REQUEST);
    }

    if (cekEnrollment.user_id !== student_id) {
      throw new HttpException(
        'You are not authorized to update this enrollment',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const cekModuleId = await this.prisma.modules.findMany({
      where: {
        AND: {
          id: {
            in: completedModules,
          },
          course_id: cekEnrollment.course_id,
        },
      },
    });

    if (!cekModuleId) {
      throw new HttpException('Invalid module id', HttpStatus.BAD_REQUEST);
    }

    cekEnrollment.complatedModules.map((module) => {
      if (completedModules.includes(module)) {
        throw new HttpException(
          'Module already completed',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    const existingComplatedModules = cekEnrollment.complatedModules;
    const newComplatedModules = [
      ...existingComplatedModules,
      ...completedModules,
    ];

    await this.prisma.enrollments.update({
      where: {
        id: enrollmentId,
      },
      data: {
        complatedModules: {
          set: newComplatedModules,
        },
      },
    });

    const courseModules = await this.prisma.modules.findMany({
      where: {
        course_id: cekEnrollment.course_id,
      },
    });
    const userEnrollment = await this.prisma.enrollments.findUnique({
      where: {
        id: enrollmentId,
      },
    });

    const totalModules = courseModules.length;
    const totalCompletedModules = userEnrollment.complatedModules.length;

    const progress = (totalCompletedModules / totalModules) * 100;

    const UpdateEnrollment = await this.prisma.enrollments.update({
      where: {
        id: enrollmentId,
      },
      data: {
        progress: progress,
      },
    });

    const response = {
      message: 'Enrollment updated successfully.',
      data: {
        id: UpdateEnrollment.id,
        course_id: UpdateEnrollment.course_id,
        user_id: UpdateEnrollment.user_id,
        progress: UpdateEnrollment.progress,
      },
    };

    return response;
  }
}
