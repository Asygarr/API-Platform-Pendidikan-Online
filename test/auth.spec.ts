import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('Auth Controller', () => {
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

  describe('POST /api/auth/register', () => {
    beforeEach(async () => {
      await testService.deleteUserTest();
    });

    it('should be able to register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          name: 'test',
          username: 'test',
          email: 'test@example.com',
          password: '12345678',
          role: 'instruktur',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully.');
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('username');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data).toHaveProperty('createdAt');
    });

    it('should be rejected if email or username already exists', async () => {
      await testService.registerTest();
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          name: 'test',
          username: 'test',
          email: 'test@example.com',
          password: '12345678',
          role: 'instruktur',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email or Username already exists.');
    });

    it('should be rejected if invalid role', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          name: 'test',
          username: 'test',
          email: 'test@example.com',
          password: '12345678',
          role: 'invalid',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await testService.deleteUserTest();
    });

    it('should be able to login', async () => {
      await testService.registerTest();
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: '12345678',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should be rejected if invalid credentials', async () => {
      await testService.registerTest();
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'test',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid credentials.');
    });

    it('should be rejected if email not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'email not found',
          password: '12345678',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Email not found.');
    });
  });
});
