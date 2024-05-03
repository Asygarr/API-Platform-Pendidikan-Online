import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuard } from '../middleware/role/role.guard';
import { Roles } from '../middleware/role/roles.decorator';
import {
  CreatedPost,
  DataPostList,
  DeletePost,
  DetailPostId,
  UpdatePost,
} from './entities/post.entity';

@Controller('/api/posts')
@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard)
@Roles(['siswa', 'instruktur'])
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreatedPost,
    description: 'The record has been successfully created.',
  })
  createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postsService.createPost(createPostDto, req);
  }

  @Put(':id')
  @ApiOkResponse({
    type: UpdatePost,
    description: 'The record has been successfully updated.',
  })
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: any,
  ) {
    return this.postsService.updatePost(id, updatePostDto, req);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: DeletePost,
    description: 'The record has been successfully deleted.',
  })
  deletePost(@Param('id') id: string, @Req() req: any) {
    return this.postsService.deletePost(id, req);
  }

  @Get()
  @ApiOkResponse({
    type: DataPostList,
    description: 'The records have been successfully retrieved.',
  })
  getAllPostsParent() {
    return this.postsService.getAllPostsParent();
  }

  @Get(':id')
  @ApiOkResponse({
    type: DetailPostId,
    description: 'The record has been successfully retrieved.',
  })
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }
}
