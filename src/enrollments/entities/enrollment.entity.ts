import { ApiProperty } from '@nestjs/swagger';

class DataCreateEnrollment {
  @ApiProperty({ example: 'enrollment_id' })
  id: string;

  @ApiProperty({ example: 'user_id' })
  user_id: string;

  @ApiProperty({ example: 'course_id' })
  course_id: string;

  @ApiProperty({ example: '0' })
  progress: number;
}

class DataUpdateEnrollment {
  @ApiProperty({ example: 'enrollment_id' })
  id: string;

  @ApiProperty({ example: 'user_id' })
  user_id: string;

  @ApiProperty({ example: 'course_id' })
  course_id: string;

  @ApiProperty({ example: '20' })
  progress: number;
}

export class CreatedEnrollment {
  @ApiProperty({ example: 'Enrollment created successfully' })
  message: string;

  @ApiProperty({ type: [DataCreateEnrollment] })
  data: DataCreateEnrollment[];
}

export class UpdateEnrollment {
  @ApiProperty({ example: 'Enrollment updated successfully' })
  message: string;

  @ApiProperty({ type: [DataUpdateEnrollment] })
  data: DataUpdateEnrollment[];
}

export class GetAllEnrollments {
  @ApiProperty({ example: 'Enrollments retrieved successfully' })
  message: string;

  @ApiProperty({ type: [DataCreateEnrollment] })
  data: DataCreateEnrollment[];
}
