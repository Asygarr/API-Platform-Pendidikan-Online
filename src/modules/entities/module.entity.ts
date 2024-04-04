import { ApiProperty } from '@nestjs/swagger';

class Data {
  @ApiProperty({ example: 'module_id' })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ example: 'mp4 | docs | pdf' })
  content: Express.Multer.File;

  @ApiProperty({ example: 'course_id' })
  course_id: string;

  @ApiProperty({ example: 'instructor_id' })
  instructor_id: string;
}

export class CreateModule {
  @ApiProperty({ example: 'Module created successfully' })
  message: string;

  @ApiProperty()
  data: Data;
}

export class UpdateModule {
  @ApiProperty({ example: 'Module updated successfully' })
  message: string;

  @ApiProperty()
  data: Data;
}

export class GetModule {
  @ApiProperty({ example: 'Modules retrieved successfully' })
  message: string;

  @ApiProperty({ type: [Data] })
  data: Data[];
}
