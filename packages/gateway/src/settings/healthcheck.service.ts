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
    @Inject('MAILER') private readonly msMailer: ClientProxy,
    @Inject('STATS') private readonly msStats: ClientProxy,
    @Inject('USERS') private readonly msUsers: ClientProxy,
  ) {
  }

  async getAll() {
    const microservices = await this.microservices();
    let isHealthy = true;

    microservices.forEach((item) => {
      if (!item.isHealthy) {
        isHealthy = false;
      }
    });

    return {
      isHealthy,
      microservices,
    };
  }

  async microservices(): Promise<Microservice[]> {
    // Check all microservices
    const microservices: Microservice[] = [];

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

    try {
      microservices.push({
        name: 'stats',
        isHealthy:
          (await firstValueFrom(
            this.msStats.send<boolean>('healthcheck', {}),
          )) || false,
        error: null,
      });
    } catch (e: Error | any) {
      microservices.push({
        name: 'stats',
        isHealthy: false,
        error: e?.message,
      });
    }

    try {
      microservices.push({
        name: 'users',
        isHealthy:
          (await firstValueFrom(
            this.msUsers.send<boolean>('healthcheck', {}),
          )) || false,
        error: null,
      });
    } catch (e: Error | any) {
      microservices.push({
        name: 'users',
        isHealthy: false,
        error: e?.message,
      });
    }

    return microservices;
  }
}
