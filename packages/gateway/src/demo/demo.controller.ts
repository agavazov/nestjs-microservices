import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller('/demo')
export class DemoController {
  constructor(private demoService: DemoService) {}

  @Get('/')
  protected async createUser() {
    return this.demoService.doDemo();
  }
}
