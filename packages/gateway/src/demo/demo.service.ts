import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DemoService {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('STATS') private readonly msStats: ClientProxy,
  ) {
  }

  async createUser() {
    // Send SYNC request
    const pattern = 'users.create';
    const payload = {
      email: 'alex@gavazov.net',
      name: 'Alexander Gavazov',
    };

    let response;
    let error;
    try {
      console.log('>>>> Send request *users.create* to [users]');

      response = await firstValueFrom<any>( this.msUsers.send<boolean>(pattern, payload) );
    } catch (e: Error | any) {
      error = e?.message;
    }

    // Send ASYNC
    if (!error) {
      console.log('>>>> Emit *registration* to [stats]');
      this.msStats.emit<number>('registration', {
        userId: response?.userId,
        email: payload.email,
        name: payload.name,
      });
    }

    // Return response to the client
    return {
      response,
      error,
    };
  }
}
