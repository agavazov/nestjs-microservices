import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Settings / Healthcheck (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/settings/healthcheck', () => {
    return request
      .default(app.getHttpServer())
      .get('/settings/healthcheck')
      .expect(200)
      .expect((res: Response) => {
        if (res?.body?.isHealthy !== true) {
          throw new Error('Must be true');
        }
      });
  });
});
