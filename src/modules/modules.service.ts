import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PrismaService } from '../connection/prisma.service';
import { deleteFileDir } from '../lib/delete-file-dir';
import * as fs from 'fs';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    coursesId: string,
    createModuleDto: CreateModuleDto,
    content: Express.Multer.File,
    req: any,
  ) {
    const { title } = createModuleDto;

    if (!title) {
      throw new HttpException(
        'Title or Content is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cekCourses = await this.prisma.courses.findUnique({
      where: {
        id: coursesId,
      },
    });

    if (!cekCourses) {
      throw new HttpException('Courses is not found.', HttpStatus.NOT_FOUND);
    }

    const contentUrl = `${req.protocol}://${req.get('host')}/module/file/${
      content.filename
    }`;

    const createModule = await this.prisma.modules.create({
      data: {
        title: title,
        content: contentUrl,
        course_id: coursesId,
      },
    });

    const response = {
      message: 'Module created successfully.',
      data: createModule,
    };

    return response;
  }

  async findAll(courseId: string) {
    const cekCourses = await this.prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!cekCourses) {
      throw new HttpException('Courses is not found.', HttpStatus.NOT_FOUND);
    }

    const modules = await this.prisma.modules.findMany({
      where: {
        course_id: courseId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        course_id: true,
      },
    });

    const response = {
      message: 'Modules retrieved successfully.',
      data: modules,
    };

    return response;
  }

  async update(
    coursesId: string,
    moduleId: string,
    updateModuleDto: UpdateModuleDto,
    content: Express.Multer.File,
    req: any,
  ) {
    let { title } = updateModuleDto;
    const instructor_id = req.user.id;

    const cekCourses = await this.prisma.courses.findUnique({
      where: {
        id: coursesId,
      },
    });

    if (!cekCourses) {
      deleteFileDir(content.filename);

      throw new HttpException(
        'Courses or Module is not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (cekCourses.instructor_id !== instructor_id) {
      deleteFileDir(content.filename);

      throw new HttpException(
        'You are not authorized to update this course.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const cekModule = await this.prisma.modules.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!cekModule) {
      deleteFileDir(content.filename);

      throw new HttpException(
        'Courses or Module is not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!title) {
      title = cekModule.title;
    }

    let contentUrl = cekModule.content;
    if (content) {
      contentUrl = `${req.protocol}://${req.get('host')}/module/file/${
        content.filename
      }`;

      const splitUrl = cekModule.content.split('/');
      const contentName = splitUrl[splitUrl.length - 1];
      const contentPath = `public/module/file/${contentName}`;

      if (fs.existsSync(contentPath)) {
        fs.unlinkSync(contentPath);
      }
    }

    const updateModule = await this.prisma.modules.update({
      where: {
        id: moduleId,
      },
      data: {
        title: title,
        content: contentUrl,
        course_id: coursesId,
      },
    });

    const response = {
      message: 'Module updated successfully.',
      data: updateModule,
    };

    return response;
  }
}
