import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RegistrationLoggerController {
  @MessagePattern('registration')
  async handleEvent(data: any) {
    console.log(`~~STATS.REGISTRATION~~ Create new user "${JSON.stringify(data)}"`);
  }
}
