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

      if (cekParentPost.course_id !== courseId) {
        throw new HttpException(
          'parent post not found in this course',
          HttpStatus.NOT_FOUND,
        );
      }

      if (cekParentPost.parent_post_id) {
        postId = cekParentPost.parent_post_id;
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

  async updatePost(id: string, updatePostDto: UpdatePostDto, req: any) {
    const { content } = updatePostDto;
    const userId = req.user.id;

    try {
      const cekPost = await this.prisma.posts.findUnique({
        where: {
          id,
        },
      });

      if (!cekPost) {
        throw new HttpException('post not found', HttpStatus.NOT_FOUND);
      }

      if (cekPost.user_id !== userId) {
        throw new HttpException(
          'you are not authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    try {
      const updatePost = await this.prisma.posts.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });

      const response = {
        message: 'Post updated successfully.',
        data: updatePost,
      };

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deletePost(id: string, req: any) {
    const userId = req.user.id;

    try {
      const cekPost = await this.prisma.posts.findUnique({
        where: {
          id,
        },
      });

      if (!cekPost) {
        throw new HttpException('post not found', HttpStatus.NOT_FOUND);
      }

      if (cekPost.user_id !== userId) {
        throw new HttpException(
          'you are not authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }

      try {
        const cekPostChild = await this.prisma.posts.findMany({
          where: {
            parent_post_id: id,
          },
        });

        if (cekPostChild.length > 0) {
          try {
            await this.prisma.posts.deleteMany({
              where: {
                parent_post_id: id,
              },
            });
          } catch (error) {
            throw new HttpException(
              error.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        }
      } catch (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.prisma.posts.delete({
        where: {
          id,
        },
      });

      const response = {
        message: 'Post deleted successfully.',
      };

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAllPostsParent() {
    try {
      const getPosts = await this.prisma.posts.findMany({
        where: {
          parent_post_id: null,
        },
        select: {
          id: true,
          content: true,
          user_id: true,
          course_id: true,
          parent_post_id: false,
          childPosts: {
            select: {
              id: true,
              content: true,
              user_id: true,
              course_id: true,
              parent_post_id: true,
            },
          },
        },
      });

      if (getPosts.length === 0) {
        throw new HttpException('posts not found', HttpStatus.NOT_FOUND);
      }

      const response = {
        message: 'The records have been successfully retrieved.',
        data: getPosts,
      };

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getPostById(id: string) {
    try {
      const cekPost = await this.prisma.posts.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          content: true,
          user_id: true,
          course_id: true,
          parent_post_id: false,
          childPosts: {
            select: {
              id: true,
              content: true,
              user_id: true,
              course_id: true,
              parent_post_id: true,
            },
          },
        },
      });

      if (!cekPost) {
        throw new HttpException('post not found', HttpStatus.NOT_FOUND);
      }

      const response = {
        message: 'The record has been successfully retrieved.',
        data: cekPost,
      };

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
