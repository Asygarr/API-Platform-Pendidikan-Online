import { PartialType } from '@nestjs/swagger';
import { CreateCourse } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourse) {}
