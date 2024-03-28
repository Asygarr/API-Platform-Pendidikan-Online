import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, CoursesModule, ModulesModule, EnrollmentsModule, PostsModule],
  controllers: [],
})
export class AppModule {}
