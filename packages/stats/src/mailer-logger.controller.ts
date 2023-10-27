import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { colors } from 'colors.ts';

@Controller()
export class MailerLoggerController {
  @MessagePattern('mailer.welcome')
  async handleEvent(data: any) {
    console.log(
      colors('yellow', `\n[stats.listen] for {mailer.*}\n${JSON.stringify(data, null, 2)}\n`)
    );
  }
}
