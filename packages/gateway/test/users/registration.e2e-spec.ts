import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Users / Registration (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/registration', () => {
    return request
      .default(app.getHttpServer())
      .post('/users/registration')
      .send({
        email: 'alex@gavazov.net',
        name: 'Alexander Gavazov',
        password: '123456',
      })
      .expect(201)
      .expect((res: Response) => {
        console.log('res?.body res?.body res?.body', res?.body);
        if (typeof res?.body?.id === 'string') {
          throw new Error('id is missing or not in the correct format');
        }
      });
  });
});
