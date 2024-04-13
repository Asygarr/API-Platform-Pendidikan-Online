import * as request from 'supertest';

export const loginInstruktur = async (app: any) => {
  const login = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({
      email: 'instruktur@example.com',
      password: '12345678',
    });

  return login.body.token;
};

export const loginWrongInstruktur = async (app: any) => {
  const login = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({
      email: 'instruktur2@example.com',
      password: '12345678',
    });

  return login.body.token;
};

export const loginSiswa = async (app: any) => {
  const login = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({
      email: 'siswa@example.com',
      password: '12345678',
    });

  return login.body.token;
};

export const loginWrongSiswa = async (app: any) => {
  const login = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({
      email: 'siswa2@example.com',
      password: '12345678',
    });

  return login.body.token;
};
