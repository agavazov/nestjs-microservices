import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { colors } from 'colors.ts';

@Controller()
export class RegistrationLoggerController {
  @MessagePattern('users.reg')
  async handleEvent(data: any) {
    console.log(
      colors('yellow', `\n[stats.listen] for {users.reg}\n${JSON.stringify(data, null, 2)}\n`)
    );
  }
}
