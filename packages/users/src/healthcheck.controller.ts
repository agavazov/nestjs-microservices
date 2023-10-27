import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class HealthcheckController {
  @MessagePattern('healthcheck')
  async healthcheck() {
    console.log('YES');

    return true;
  }
}
