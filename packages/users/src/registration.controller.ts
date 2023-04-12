import { Controller, } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class RegistrationController {
  @EventPattern('users.create')
  async eventPingListener(data: any) {
    // Response
    console.log(`>>>> Response to for *users.create* / In data: ${JSON.stringify(data)}`);

    return {
      success: true,
      userId: Math.floor(Date.now() / 1000),
    };
  }
}
