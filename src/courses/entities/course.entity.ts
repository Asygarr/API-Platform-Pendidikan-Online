import { ApiProperty } from '@nestjs/swagger';

class DataCreateCourse {
  @ApiProperty({ example: 'course_id' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ example: 'instructor_id' })
  instructor_id: string;

  @ApiProperty()
  createdAt: Date;
}

class DataUpdateCourse {
  @ApiProperty({ example: 'course_id' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ example: 'instructor_id' })
  instructor_id: string;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateCourses {
  @ApiProperty({ example: 'Courses created successfully.' })
  message: string;

  @ApiProperty()
  data: DataCreateCourse;
}

export class UpdateCourses {
  @ApiProperty({ example: 'Courses updated successfully.' })
  message: string;

  @ApiProperty()
  data: DataUpdateCourse;
}

export class DeleteCourses {
  @ApiProperty()
  message: string;
}

export class GetCourses {
  @ApiProperty({ example: 'Courses retrieved successfully.' })
  message: string;

  @ApiProperty({ type: [DataCreateCourse] })
  data: DataCreateCourse[];
}
