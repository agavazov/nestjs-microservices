import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DemoService {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject('MAILER') private readonly msMailer: ClientProxy,
  ) {}

  async doDemo() {
    await this.doLocalEmit();

    return this.pingService();
  }

  async doLocalEmit() {
    await this.eventEmitter.emitAsync('auth.registration', {
      id: 1234,
      email: 'demo@test.com',
    });
  }

  async pingService() {
    const startTs = Date.now();
    const pattern = 'hello';
    const payload = {};

    let message;
    try {
      message = await firstValueFrom(
        this.msMailer.send<boolean>(pattern, payload),
      );
    } catch (e: Error | any) {
      message = e?.message;
    }

    this.msMailer.emit<number>(
      'user_created',
      'gateway date' + Date().toString(),
    );

    return {
      message,
      duration: Date.now() - startTs,
    };
  }
}
