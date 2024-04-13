import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  course_id: string;
}
