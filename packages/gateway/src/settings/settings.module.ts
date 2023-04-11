import { Module } from '@nestjs/common';
import { MicroservicesModule } from '../microservices/microservices.module';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
  imports: [MicroservicesModule],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class SettingsModule {}
