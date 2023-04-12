import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DemoController } from './demo.controller';
import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DemoController, HealthcheckController],
  providers: [],
})
export class AppModule {
}
