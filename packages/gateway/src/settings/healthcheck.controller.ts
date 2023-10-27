import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';

@Controller('/settings/healthcheck')
export class HealthcheckController {
  constructor(private healthcheckService: HealthcheckService) {}

  @Get('/')
  protected async healthcheck() {
    return this.healthcheckService.getAll();
  }

  @Get('/.del_microservices')
  protected async microservices() {
    return this.healthcheckService.microservices();
  }
}
