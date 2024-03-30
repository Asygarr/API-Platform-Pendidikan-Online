import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourse } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RoleGuard } from '../role/role.guard';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/roles.decorator';
import { SuccesCreatedCourses } from './entities/course.entity';

@Controller('api/courses')
@ApiTags('courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(['instruktur'])
  @ApiCreatedResponse({
    description: 'Courses created',
    type: SuccesCreatedCourses,
  })
  create(@Body() createCourse: CreateCourse, @Req() req: any) {
    return this.coursesService.create(createCourse, req);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(['instruktur', 'siswa'])
  findAll(@Req() req: any) {
    return this.coursesService.findAll();
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles(['instruktur'])
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(['instruktur'])
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
