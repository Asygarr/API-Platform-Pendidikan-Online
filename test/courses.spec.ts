import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { describe } from 'node:test';

describe('Courses Controller', () => {
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

  describe('POST /api/courses', () => {
    beforeEach(async () => {
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be able to create courses', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .post('/api/courses')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({
          title: 'test',
          description: 'test',
        });

      expect(responses.status).toBe(201);
      expect(responses.body.message).toBe('Courses created successfully.');
      expect(responses.body.data).toHaveProperty('id');
      expect(responses.body.data).toHaveProperty('title');
      expect(responses.body.data).toHaveProperty('description');
      expect(responses.body.data).toHaveProperty('instructor_id');
      expect(responses.body.data).toHaveProperty('cretaedAt');
    });

    it('should be rejected if title or description is empty', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .post('/api/courses')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({
          title: '',
          description: '',
        });

      expect(responses.status).toBe(400);
      expect(responses.body.message).toBe('Title or Description is required.');
    });

    it('should be rejected if user is not an instructor', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'siswa@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .post('/api/courses')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({
          title: 'test',
          description: 'test',
        });

      expect(responses.status).toBe(403);
      expect(responses.body.message).toBe('Forbidden resource');
    });
  });

  describe('PUT /api/courses/:id', () => {
    beforeEach(async () => {
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be rejected if user is not an instructor', async () => {
      const courseIdUpdate = await testService.createCoursesTest();

      const loginWrongInstruktur = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur2@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .put(`/api/courses/${courseIdUpdate}`)
        .set('Authorization', `Bearer ${loginWrongInstruktur.body.token}`)
        .send({
          title: 'test update',
          description: 'test',
        });

      expect(responses.status).toBe(401);
      expect(responses.body.message).toBe(
        'You are not authorized to update this course.',
      );
    });

    it('should be rejected if course not found', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur2@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .put(`/api/courses/wrongId`)
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({
          title: 'test',
          description: 'test',
        });

      expect(responses.status).toBe(404);
      expect(responses.body.message).toBe('Course not found.');
    });

    it('should be rejected if user login is not an instructor', async () => {
      const courseIdUpdate = await testService.createCoursesTest();

      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'siswa@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .put(`/api/courses/${courseIdUpdate}`)
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({
          title: 'test',
          description: 'test',
        });

      expect(responses.status).toBe(403);
      expect(responses.body.message).toBe('Forbidden resource');
    });
  });

  describe('DELETE /api/courses/:id', () => {
    beforeEach(async () => {
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be rejected if user is not an instructor', async () => {
      const courseIdDelete = await testService.createCoursesTest();

      const loginWrongInstuktur = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur2@example.com',
          password: '12345678',
        });

      const response = await request(app.getHttpServer())
        .delete('/api/courses/' + courseIdDelete)
        .set('Authorization', `Bearer ${loginWrongInstuktur.body.token}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not authorized to delete this course.',
      );
    });

    it('should be rejected if course not found', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .delete(`/api/courses/wrongId`)
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(responses.status).toBe(404);
      expect(responses.body.message).toBe('Course not found.');
    });

    it('should be able to delete courses', async () => {
      const courseIdDelete = await testService.createCoursesTest();

      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur@example.com',
          password: '12345678',
        });

      const response = await request(app.getHttpServer())
        .delete('/api/courses/' + courseIdDelete)
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Courses deleted successfully.');
    });

    it('should be rejected if user is not an instructor', async () => {
      const courseIdDelete = await testService.createCoursesTest();

      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'siswa@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .delete('/api/courses/' + courseIdDelete)
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(responses.status).toBe(403);
      expect(responses.body.message).toBe('Forbidden resource');
    });
  });

  describe('GET /api/courses', () => {
    beforeEach(async () => {
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be able to get all courses if login as instruktur', async () => {
      await testService.createCoursesTestMany();

      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'instruktur@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .get('/api/courses')
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(responses.status).toBe(200);
      expect(responses.body.message).toBe('Courses retrieved successfully.');
      expect(responses.body).toHaveProperty('data');
    });

    it('should be able to get all courses if login as siswa', async () => {
      await testService.createCoursesTestMany();

      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'siswa@example.com',
          password: '12345678',
        });

      const responses = await request(app.getHttpServer())
        .get('/api/courses')
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(responses.status).toBe(200);
      expect(responses.body.message).toBe('Courses retrieved successfully.');
      expect(responses.body).toHaveProperty('data');
    });
  });
});
