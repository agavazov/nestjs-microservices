import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesList } from 'nestjs-microservices-gateway/dist/src/microservices-list';
import { DemoController } from './demo.controller';
import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [
    // Register all microservices
    ClientsModule.register(microservicesList),
  ],
  controllers: [DemoController, HealthcheckController],
  providers: [],
})
export class AppModule {
}
