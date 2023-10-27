import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesList } from 'nestjs-microservices-gateway/dist/src/microservices-list';
import { HealthcheckController } from './healthcheck.controller';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [
    // Register all microservices
    ClientsModule.register(microservicesList),
  ],
  controllers: [RegistrationController, HealthcheckController],
  providers: [],
})
export class AppModule {
}
