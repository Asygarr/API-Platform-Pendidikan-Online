import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../connection/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto, req: any) {
    const { content, courseId, parentPostId } = createPostDto;
    const userId = req.user.id;
    let postId = parentPostId;

    const cekCourse = await this.prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!cekCourse) {
      throw new HttpException('course not found', HttpStatus.NOT_FOUND);
    }

    if (parentPostId) {
      const cekParentPost = await this.prisma.posts.findUnique({
        where: {
          id: parentPostId,
        },
      });

      if (!cekParentPost) {
        throw new HttpException('parent post not found', HttpStatus.NOT_FOUND);
      }
    } else {
      postId = null;
    }

    const createPost = await this.prisma.posts.create({
      data: {
        content,
        course_id: courseId,
        user_id: userId,
        parent_post_id: postId,
      },
    });

    const response = {
      message: 'Post created successfully.',
      data: createPost,
    };

    return response;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
