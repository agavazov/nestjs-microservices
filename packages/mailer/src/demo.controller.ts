import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class DemoController {
  @MessagePattern('hello')
  async ping() {
    return 'pong-mailer';
  }

  @EventPattern('user_created')
  async eventPingListener(data: any) {
    console.log('>>eventPingListener<<<', data);
  }
}
