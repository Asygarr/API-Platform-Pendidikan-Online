import { ApiProperty } from '@nestjs/swagger';

class DataPost {
  @ApiProperty({ example: 'post_id' })
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ example: 'user_id' })
  user_id: string;

  @ApiProperty({ example: 'course_id' })
  course_id: string;

  @ApiProperty({ example: 'optional_parent_post_id' })
  parent_post_id: string;
}

class DataPostListParent {
  @ApiProperty({ example: 'post_id' })
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ example: 'user_id' })
  user_id: string;

  @ApiProperty({ example: 'course_id' })
  course_id: string;

  @ApiProperty({ example: 'optional_parent_post_id' })
  parent_post_id: string;

  @ApiProperty({ type: [DataPost] })
  child_post: DataPost[];
}

export class CreatedPost {
  @ApiProperty({ example: 'Post created successfully.' })
  message: string;

  @ApiProperty({ type: DataPost })
  data: DataPost;
}

export class UpdatePost {
  @ApiProperty({ example: 'Post updated successfully.' })
  message: string;

  @ApiProperty({ type: DataPost })
  data: DataPost;
}

export class DeletePost {
  @ApiProperty({ example: 'Post deleted successfully.' })
  message: string;
}

export class DataPostList {
  @ApiProperty({ example: 'Post retrieved successfully.' })
  message: string;

  @ApiProperty({ type: [DataPostListParent] })
  data: DataPostListParent[];
}

export class DetailPostId {
  @ApiProperty({ example: 'Post retrieved successfully.' })
  message: string;

  @ApiProperty({ type: DataPostListParent })
  data: DataPostListParent;
}
