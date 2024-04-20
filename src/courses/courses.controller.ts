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
import { RoleGuard } from '../middleware/role/role.guard';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../middleware/role/roles.decorator';
import {
  CreateCourses,
  DeleteCourses,
  GetCourses,
  UpdateCourses,
} from './entities/course.entity';

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
    type: CreateCourses,
  })
  create(@Body() createCourse: CreateCourse, @Req() req: any) {
    return this.coursesService.create(createCourse, req);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(['instruktur', 'siswa'])
  @ApiOkResponse({
    description: 'Courses retrieved',
    type: GetCourses,
  })
  findAll() {
    return this.coursesService.findAll();
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles(['instruktur'])
  @ApiOkResponse({
    description: 'Courses updated',
    type: UpdateCourses,
  })
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() req: any,
  ) {
    return this.coursesService.update(id, updateCourseDto, req);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @ApiOkResponse({
    description: 'Courses deleted',
    type: DeleteCourses,
  })
  @Roles(['instruktur'])
  remove(@Param('id') id: string, @Req() req: any) {
    return this.coursesService.remove(id, req);
  }
}
