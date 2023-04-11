import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

type Microservice = {
  name: string;
  error: string | null;
  isHealthy: boolean;
};

@Injectable()
export class HealthcheckService {
  constructor(
    @Inject('AUTH') private readonly msAuth: ClientProxy,
    @Inject('MAILER') private readonly msMailer: ClientProxy,
  ) {}

  async getAll() {
    const microservices = await this.microservices();
    let isHealthy = true;
    let error = null;

    microservices.forEach((item) => {
      if (!item.isHealthy) {
        isHealthy = false;
        error =
          `Microservice [${item.name}] error: ` + (item.error || 'unknown');
      }
    });

    return {
      isHealthy,
      error,
      microservices,
    };
  }

  async microservices(): Promise<Microservice[]> {
    // Check all microservices
    const microservices: Microservice[] = [];

    try {
      microservices.push({
        name: 'auth',
        isHealthy:
          (await firstValueFrom(
            this.msAuth.send<boolean>('healthcheck', {}),
          )) || false,
        error: null,
      });
    } catch (e: Error | any) {
      microservices.push({
        name: 'auth',
        isHealthy: false,
        error: e?.message,
      });
    }

    try {
      microservices.push({
        name: 'mailer',
        isHealthy:
          (await firstValueFrom(
            this.msMailer.send<boolean>('healthcheck', {}),
          )) || false,
        error: null,
      });
    } catch (e: Error | any) {
      microservices.push({
        name: 'mailer',
        isHealthy: false,
        error: e?.message,
      });
    }

    return microservices;
  }
}
