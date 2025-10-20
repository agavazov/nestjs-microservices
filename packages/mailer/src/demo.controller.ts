import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { colors } from 'colors.ts';

@Controller()
export class DemoController {
  constructor(
    @Inject('USERS') private readonly msUsers: ClientProxy,
    @Inject('MAILER') private readonly msMailer: ClientProxy,
    @Inject('STATS') private readonly msStats: ClientProxy,
  ) {
  }

  @MessagePattern('hello')
  async ping() {
    return 'pong-mailer';
  }

  @EventPattern('users.reg')
  async handleEvent(data: any) {
    console.log(
      colors('red', `\n[mailer.listen] {users.reg}\n${JSON.stringify(data, null, 2)}\n`)
    );

    // Send to stats
    console.log(
      colors('red', `\n[mailer.emit] mailer.welcome\n "Welcome ${data.email} <${data.name}>"\n`)
    );

    // Send asynchronous events
    this.msStats.emit<number>('mailer.welcome', data);
  }
}
