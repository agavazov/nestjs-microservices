import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [],
  controllers: [DemoController, HealthcheckController],
  providers: [],
})
export class AppModule {}
