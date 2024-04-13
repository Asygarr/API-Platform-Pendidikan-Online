import * as request from 'supertest';

export const createdEnrollment = async (
  app: any,
  token: string,
  courseId: string,
) => {
  const enrollment = await request(app.getHttpServer())
    .post('/api/enrollments')
    .set('Authorization', `Bearer ${token}`)
    .send({
      course_id: courseId,
    });

  return enrollment;
};
