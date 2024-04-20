import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { describe, afterEach } from 'node:test';
import { loginInstruktur, loginWrongInstruktur } from '../src/lib/login-test';

describe('Modules Controller', () => {
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

  describe('POST /api/courses/:coursesId/modules', () => {
    afterEach(async () => {
      await testService.deleteEnrollmentsTest();
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be able to reject if courses is not found', async () => {
      const login = await loginInstruktur(app);
      const wrongCoursesId = 'nwudba8UBd9ww8bdu9Opqx';

      const response = await request(app.getHttpServer())
        .post(`/api/courses/${wrongCoursesId}/modules`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Courses is not found.');
    });

    it('should be able to reject if title is empty', async () => {
      const login = await loginInstruktur(app);
      const coursesId = await testService.coursesIdForModuleTest();

      const response = await request(app.getHttpServer())
        .post(`/api/courses/${coursesId}/modules`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', '')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Title or Content is required.');
    });

    it('should be able to create module', async () => {
      const login = await loginInstruktur(app);
      const coursesId = await testService.coursesIdForModuleTest();

      const response = await request(app.getHttpServer())
        .post(`/api/courses/${coursesId}/modules`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.message).toEqual('Module created successfully.');
    });
  });

  describe('PUT /api/courses/:coursesId/modules/moduleId', () => {
    afterEach(async () => {
      await testService.deleteEnrollmentsTest();
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be able to reject if unauthorized this module', async () => {
      const login = await loginWrongInstruktur(app);
      const createTestModule = await testService.createModule();
      const { coursesId, moduleId } = createTestModule;

      const response = await request(app.getHttpServer())
        .put(`/api/courses/${coursesId}/modules/${moduleId}`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test update')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual(
        'You are not authorized to update this course.',
      );
    });

    it('should be able to reject if Courses is not found', async () => {
      const login = await loginInstruktur(app);
      const createTestModule = await testService.createModule();
      const { moduleId } = createTestModule;
      const wrongCoursesId = 'wjbawbdubauwda8wdbuwv27';

      const response = await request(app.getHttpServer())
        .put(`/api/courses/${wrongCoursesId}/modules/${moduleId}`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test update')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Courses or Module is not found.');
    });

    it('should be able to reject if Module is not found', async () => {
      const login = await loginInstruktur(app);
      const createTestModule = await testService.createModule();
      const { coursesId } = createTestModule;
      const wrongModuleId = 'wjbawbdubauwda8wdbuwv27';

      const response = await request(app.getHttpServer())
        .put(`/api/courses/${coursesId}/modules/${wrongModuleId}`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test update')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Courses or Module is not found.');
    });

    it('should be able to update this module', async () => {
      const login = await loginInstruktur(app);
      const createTestModule = await testService.createModule();
      const { coursesId, moduleId } = createTestModule;

      const response = await request(app.getHttpServer())
        .put(`/api/courses/${coursesId}/modules/${moduleId}`)
        .set('Authorization', `Bearer ${login}`)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'test update')
        .attach('content', 'test/files/test.pdf');

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Module updated successfully.');
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('GET /api/courses/:coursesId/modules', () => {
    afterEach(async () => {
      await testService.deleteEnrollmentsTest();
      await testService.deleteModuleTest();
      await testService.deleteCoursesTest();
    });

    it('should be able to reject if courses is not found', async () => {
      const login = await loginInstruktur(app);
      const wrongCoursesId = 'nwudba8UBd9ww8bdu9Opqx';

      const response = await request(app.getHttpServer())
        .get(`/api/courses/${wrongCoursesId}/modules`)
        .set('Authorization', `Bearer ${login}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Courses is not found.');
    });

    it('should be able to get module', async () => {
      const login = await loginInstruktur(app);
      const createTestModule = await testService.createModule();
      const { coursesId } = createTestModule;

      const response = await request(app.getHttpServer())
        .get(`/api/courses/${coursesId}/modules`)
        .set('Authorization', `Bearer ${login}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Modules retrieved successfully.');
    });
  });
});
