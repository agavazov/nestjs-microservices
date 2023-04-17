import { Controller, } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class RegistrationController {
  @EventPattern('users.create')
  async handleEvent(data: any) {
    // Response
    console.log(`~~users.create~~ Create new user "${JSON.stringify(data)}"`);

    return {
      success: true,
      userId: Math.floor(Date.now() / 1000),
    };
  }
}
