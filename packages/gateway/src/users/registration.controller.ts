import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('/users')
export class RegistrationController {
  constructor(private demoService: RegistrationService) {}

  @Post('/registration')
  protected async createUser(@Body() data: any) {
    return this.demoService.createUser(data);
  }
}
