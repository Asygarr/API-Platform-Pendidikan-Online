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

export class CreatedPost {
  @ApiProperty({ example: 'Post created successfully.' })
  message: string;

  @ApiProperty({ type: DataPost })
  data: DataPost;
}
