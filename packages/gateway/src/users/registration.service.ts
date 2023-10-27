import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { colors } from 'colors.ts';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('MAILER') private readonly msMailer: ClientProxy,
    @Inject('STATS') private readonly msStats: ClientProxy,
  ) {
  }

  async createUser(user: any) {
    // Send SYNC request
    let response;
    let error;
    try {
      console.log(
        colors('green', `\n[gateway.request] {registration}\n${JSON.stringify(user, null, 2)}\n`)
      );

      const pattern = 'users.reg';
      response = await firstValueFrom<any>( this.msUsers.send<boolean>(pattern, user) );
    } catch (e: Error | any) {
      error = e?.message;
    }

    // Send ASYNC
    // if (!error) {
    //   this.msMailer.emit<number>('registration', {
    //     userId: response?.id,
    //     email: user.email,
    //     name: user.name,
    //   });
    //
    //   this.msStats.emit<number>('registration', {
    //     userId: response?.id,
    //     email: user.email,
    //     name: user.name,
    //   });
    // }

    // Return response to the client
    return {
      response,
      error,
    };
  }
}
