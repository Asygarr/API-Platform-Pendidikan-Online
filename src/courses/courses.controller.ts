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
  Query,
  ParseIntPipe,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../middleware/role/roles.decorator';
import {
  CreateCourses,
  DeleteCourses,
  GetCourses,
  UpdateCourses,
} from './entities/course.entity';
import { title } from 'node:process';

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
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'description', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOkResponse({
    description: 'Courses retrieved',
    type: GetCourses,
  })
  async searchCourses(
    @Query('title') title?: string,
    @Query('description') desc?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ) {
    return this.coursesService.searchCourses(title, desc, page);
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
