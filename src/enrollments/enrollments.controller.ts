import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { RoleGuard } from '../middleware/role/role.guard';
import { Roles } from '../middleware/role/roles.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import {
  CreatedEnrollment,
  UpdateEnrollment,
} from './entities/enrollment.entity';

@Controller('api/enrollments')
@ApiTags('Enrollments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(['siswa'])
  @ApiCreatedResponse({
    description: 'Enrollment created',
    type: CreatedEnrollment,
  })
  createEnrollemnts(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
    @Req() req: any,
  ) {
    return this.enrollmentsService.createEnrollment(createEnrollmentDto, req);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(['instruktur', 'siswa'])
  @ApiOkResponse({
    description: 'Enrollments retrieved',
    type: CreatedEnrollment,
  })
  getAllEnrollments() {
    return this.enrollmentsService.getAllEnrollments();
  }

  @Put(':enrollmentId')
  @UseGuards(RoleGuard)
  @Roles(['siswa'])
  @ApiOkResponse({
    description: 'Enrollment updated',
    type: UpdateEnrollment,
  })
  updateProggresEnrollment(
    @Param('enrollmentId') enrollmentId: string,
    @Req() req: any,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentsService.updateProgress(
      enrollmentId,
      req,
      updateEnrollmentDto.completedModules,
    );
  }
}
