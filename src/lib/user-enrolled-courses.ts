import { PrismaService } from '../connection/prisma.service';

const prisma = new PrismaService();

export const userEnrolledCourses = async (userId: any, coursesId: string) => {
  if (!userId) {
    return false;
  }

  const cekCourses = await prisma.courses.findUnique({
    where: {
      id: coursesId,
    },
  });

  if (!cekCourses) {
    return false;
  }

  const cekEnrolledCourses = await prisma.enrollments.findFirst({
    where: {
      AND: [
        {
          user_id: userId,
        },
        {
          course_id: coursesId,
        },
      ],
    },
  });

  if (!cekEnrolledCourses) {
    return false;
  }

  return true;
};
