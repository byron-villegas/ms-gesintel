import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Party screening API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/api/party-screening/ofac (POST) should return 200 with isOfac=false for unknown rut', () => {
    return request(app.getHttpServer())
      .post('/api/party-screening/ofac')
      .send({
        rut: '11111111-1',
        names: 'Juan Carlos',
        firstLastName: 'Bodoque',
        secondLastName: 'Trivino',
        birthDate: '1996-06-22',
      })
      .expect(200)
      .expect({ isOfac: false });
  });

  it('/api/party-screening/ofac (POST) should return 200 with isOfac=true for listed rut', () => {
    return request(app.getHttpServer())
      .post('/api/party-screening/ofac')
      .send({
        rut: '1119887-2',
        names: 'Armando',
        firstLastName: 'Fernandez',
        secondLastName: 'Larios',
        birthDate: '1949-07-13',
      })
      .expect(200)
      .expect({ isOfac: true });
  });

  it('/api/party-screening/ofac (POST) should return 200 with isOfac=true when names and birthDate match but rut differs', () => {
    return request(app.getHttpServer())
      .post('/api/party-screening/ofac')
      .send({
        rut: '99999999-9',
        names: 'Armando',
        firstLastName: 'Fernandez',
        secondLastName: 'Other',
        birthDate: '1949-07-13',
      })
      .expect(200)
      .expect({ isOfac: true });
  });

  it('/api/party-screening/ofac (POST) should return 400 for invalid payload', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/party-screening/ofac')
      .send({
        rut: 'abc',
        names: '',
        firstLastName: 'x',
        secondLastName: 'y',
        birthDate: '22-06-1996',
      })
      .expect(400);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        'rut must contain only digits, k, or hyphen',
        'birthDate must be in the format yyyy-MM-dd',
      ]),
    );
  });

  it('/api/party-screening/pep (POST) should return 200 with isPep=false for unknown rut', () => {
    return request(app.getHttpServer())
      .post('/api/party-screening/pep')
      .send({
        rut: '99999999-9',
      })
      .expect(200)
      .expect({ isPep: false });
  });

  it('/api/party-screening/pep (POST) should return 200 with isPep=true for listed rut', () => {
    return request(app.getHttpServer())
      .post('/api/party-screening/pep')
      .send({
        rut: '1378923-1',
      })
      .expect(200)
      .expect({ isPep: true });
  });

  it('/api/party-screening/pep (POST) should return 400 for invalid payload', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/party-screening/pep')
      .send({
        rut: 'abc',
      })
      .expect(400);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toEqual(
      expect.arrayContaining(['rut must contain only digits, k, or hyphen']),
    );
  });

  afterEach(async () => {
    await app.close();
  });
});
