import { PartialType } from '@nestjs/swagger';
import { Register } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(Register) {}
