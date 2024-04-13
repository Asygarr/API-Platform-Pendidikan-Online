import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateEnrollmentDto {
  @ApiProperty({ examples: ['module1', 'module2', 'module3'] })
  @IsArray()
  @IsString({ each: true })
  readonly completedModules: string[];
}
