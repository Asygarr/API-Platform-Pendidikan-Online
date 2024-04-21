import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuard } from '../middleware/role/role.guard';
import { Roles } from '../middleware/role/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from '../config/multer.config';
import {
  CreateModule,
  GetFileModule,
  GetModule,
  UpdateModule,
} from './entities/module.entity';

@Controller('/api/courses/:coursesId/modules')
@ApiTags('modules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(['instruktur'])
  @UseInterceptors(
    FileInterceptor('content', { storage: MulterConfig.storage }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'Created module response',
    type: CreateModule,
  })
  create(
    @Param('coursesId') coursesId: string,
    @Body() createModuleDto: CreateModuleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'mp4|docs|pdf',
        })
        .build(),
    )
    content: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.modulesService.create(coursesId, createModuleDto, content, req);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(['instruktur', 'siswa'])
  @ApiOkResponse({ description: 'Get module response', type: GetModule })
  findAll(@Param('coursesId') coursesId: string, @Req() req: any) {
    return this.modulesService.findAll(coursesId);
  }

  @Put(':moduleId')
  @UseGuards(RoleGuard)
  @Roles(['instruktur'])
  @UseInterceptors(
    FileInterceptor('content', { storage: MulterConfig.storage }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'Updated module response', type: UpdateModule })
  update(
    @Param('coursesId') coursesId: string,
    @Param('moduleId') moduleId: string,
    @Body() updateModuleDto: UpdateModuleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'mp4|docx|pdf',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    content: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.modulesService.update(
      coursesId,
      moduleId,
      updateModuleDto,
      content,
      req,
    );
  }

  @Get(':moduleId/file')
  @UseGuards(RoleGuard)
  @Roles(['siswa', 'instruktur'])
  @ApiOkResponse({
    description: 'Get file response',
    type: GetFileModule,
  })
  getFile(
    @Param('coursesId') coursesId: string,
    @Param('moduleId') moduleId: string,
    @Req() req: any,
  ) {
    return this.modulesService.getFile(coursesId, moduleId, req);
  }
}
