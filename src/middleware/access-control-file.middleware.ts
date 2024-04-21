import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Next,
  Req,
} from '@nestjs/common';
import { userEnrolledCourses } from '../lib/user-enrolled-courses';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccessControlFile implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(
    @Req() req: any,
    @Req() res: any,
    @Next() next: (error?: any) => void,
  ) {
    const token = req.headers['authorization'].split(' ')[1];
    const coursesId = req.params.coursesId;

    if (!token) {
      throw new HttpException('Unauthrized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const user = await this.authService.validateTokenUser(token);

      if (!user.role.includes('siswa')) {
        return next();
      }

      const cekEnrolledCourses = await userEnrolledCourses(user.id, coursesId);

      if (!cekEnrolledCourses) {
        throw new HttpException('Unauthrized', HttpStatus.UNAUTHORIZED);
      }

      next();
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
