import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RegistrationLoggerController {
  @MessagePattern('registration')
  async ping(data: any) {
    console.log(`>>>> Listener *registration* was triggered with data: ${JSON.stringify(data)}`);
  }
}
