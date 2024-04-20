import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { describe, afterEach } from 'node:test';
import { loginSiswa, loginWrongSiswa } from '../src/lib/login-test';
import { createdEnrollment } from '../src/lib/enrollment-test';

describe('Enrollments Controller', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testService = app.get(TestService);
  });

  describe('POST /api/enrollments', () => {
    afterEach(async () => {
      await testService.deleteEnrollmentsTest();
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be error when already enrolled', async () => {
      const login = await loginSiswa(app);

      const courseId = await testService.createCoursesTest();
      await createdEnrollment(app, login, courseId);

      const response = await request(app.getHttpServer())
        .post('/api/enrollments')
        .set('Authorization', `Bearer ${login}`)
        .send({
          course_id: courseId,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'You already enrolled in this course.',
      );
    });

    it('should be error when course id is invalid', async () => {
      const login = await loginSiswa(app);

      const response = await request(app.getHttpServer())
        .post('/api/enrollments')
        .set('Authorization', `Bearer ${login}`)
        .send({
          course_id: 'invalid-id',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid course id');
    });

    it('should be able to enroll in a course', async () => {
      const login = await loginSiswa(app);
      const courseId = await testService.createCoursesTest();

      const response = await request(app.getHttpServer())
        .post('/api/enrollments')
        .set('Authorization', `Bearer ${login}`)
        .send({
          course_id: courseId,
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Enrollment created successfully.');
    });
  });

  describe('PUT /api/enrollments', () => {
    afterEach(async () => {
      await testService.deleteEnrollmentsTest();
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be error when unauthorized', async () => {
      const courseId = await testService.createCoursesTest();
      await testService.createManyModule(courseId);
      const { module1, module2, module3 } =
        await testService.getModuleId(courseId);
      const login = await loginSiswa(app);
      const enrollmentId = await createdEnrollment(app, login, courseId);

      const wrongLoginSiswa = await loginWrongSiswa(app);
      const response = await request(app.getHttpServer())
        .put(`/api/enrollments/${enrollmentId.body.data.id}`)
        .set('Authorization', `Bearer ${wrongLoginSiswa}`)
        .send({
          completedModules: [module1, module2, module3],
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not authorized to update this enrollment',
      );
    });

    it('should be error when enrollment id is invalid', async () => {
      const courseId = await testService.createCoursesTest();
      await testService.createManyModule(courseId);
      const { module1, module2, module3 } =
        await testService.getModuleId(courseId);
      const login = await loginSiswa(app);

      const wrongEnrollmentId = 'invalid-id';
      const response = await request(app.getHttpServer())
        .put(`/api/enrollments/${wrongEnrollmentId}`)
        .set('Authorization', `Bearer ${login}`)
        .send({
          completedModules: [module1, module2, module3],
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid enrollment id');
    });

    it('should be error when Module already complated', async () => {
      const courseId = await testService.createCoursesTest();
      await testService.createManyModule(courseId);
      const { module1, module2, module3 } =
        await testService.getModuleId(courseId);
      const login = await loginSiswa(app);
      const enrollmentId = await createdEnrollment(app, login, courseId);

      await request(app.getHttpServer())
        .put(`/api/enrollments/${enrollmentId.body.data.id}`)
        .set('Authorization', `Bearer ${login}`)
        .send({
          completedModules: [module1, module2, module3],
        });

      const response = await request(app.getHttpServer())
        .put(`/api/enrollments/${enrollmentId.body.data.id}`)
        .set('Authorization', `Bearer ${login}`)
        .send({
          completedModules: [module1],
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Module already completed');
    });

    it('should be able to update progress', async () => {
      const courseId = await testService.createCoursesTest();
      await testService.createManyModule(courseId);
      const { module1, module2, module3 } =
        await testService.getModuleId(courseId);
      const login = await loginSiswa(app);
      const enrollmentId = await createdEnrollment(app, login, courseId);

      const response = await request(app.getHttpServer())
        .put(`/api/enrollments/${enrollmentId.body.data.id}`)
        .set('Authorization', `Bearer ${login}`)
        .send({
          completedModules: [module1, module2, module3],
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Enrollment updated successfully.');
    });
  });

  describe('GET /api/enrollments', async () => {
    afterEach(async () => {
      await testService.deleteEnrollmentsTest();
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be error when unauthorized', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/enrollments')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('should be able to get all enrollments', async () => {
      const login = await loginSiswa(app);
      const courseId = await testService.createCoursesTest();
      await testService.createManyModule(courseId);
      const { module1, module2, module3 } =
        await testService.getModuleId(courseId);
      const enrollmentId = await createdEnrollment(app, login, courseId);

      await request(app.getHttpServer())
        .put(`/api/enrollments/${enrollmentId.body.data.id}`)
        .set('Authorization', `Bearer ${login}`)
        .send({
          completedModules: [module1, module2, module3],
        });

      const response = await request(app.getHttpServer())
        .get('/api/enrollments')
        .set('Authorization', `Bearer ${login}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Enrollments retrieved successfully.');
    });
  });
});
