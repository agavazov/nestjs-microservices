import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class DemoController {
  @MessagePattern('hello')
  async ping() {
    return 'pong-mailer';
  }

  @EventPattern('registration')
  async handleEvent(data: any) {
    console.log(`~~USERS.REGISTRATION~~ Create new user "${JSON.stringify(data)}"`);
  }
}
