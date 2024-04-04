import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateModuleDto {
  @ApiProperty({ required: false })
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  content: Express.Multer.File;
}
