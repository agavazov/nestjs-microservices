import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { colors } from 'colors.ts';

@Controller()
export class RegistrationController {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('MAILER') private readonly msMailer: ClientProxy,
    @Inject('STATS') private readonly msStats: ClientProxy,
  ) {
  }

  @EventPattern('users.reg')
  async handleEvent(data: any) {
    console.log(
      colors('blue', `\n[users.request] {registration}\n${JSON.stringify(data, null, 2)}\n`)
    );

    const user = {
      success: true,
      userId: Math.floor(Date.now() / 1000),
      ...data
    }

    console.log(colors('blue', `\n[users.emit] {users.reg}\n${JSON.stringify(user, null, 2)}\n`));

    // Send asynchronous events
    this.msMailer.emit<number>('users.reg', user);
    this.msStats.emit<number>('users.reg', user);

    // Return the response
    return user;
  }
}
