import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AccessControlFile } from './middleware/access-control-file.middleware';
import { PrismaService } from './connection/prisma.service';
import { ModulesController } from './modules/modules.controller';

@Module({
  imports: [
    AuthModule,
    CoursesModule,
    ModulesModule,
    EnrollmentsModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessControlFile).forRoutes({
      path: '/api/courses/:coursesId/modules/:moduleId/file',
      method: RequestMethod.GET,
    });
  }
}
