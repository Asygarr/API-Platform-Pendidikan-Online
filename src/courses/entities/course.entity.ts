import { ApiProperty } from '@nestjs/swagger';

class CreatedCourse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  instructor_id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updated_at: Date;
}

export class SuccesCreatedCourses {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: CreatedCourse;
}
