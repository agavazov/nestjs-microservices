import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesList } from '../microservices-list';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
  imports: [
    // Register all microservices
    ClientsModule.register(microservicesList),
  ],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class SettingsModule {
}
