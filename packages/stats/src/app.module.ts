import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesList } from 'nestjs-microservices-gateway/dist/src/microservices-list';
import { HealthcheckController } from './healthcheck.controller';
import { MailerLoggerController } from './mailer-logger.controller';
import { RegistrationLoggerController } from './registration-logger.controller';

@Module({
  imports: [
    // Register all microservices
    ClientsModule.register(microservicesList),
  ],
  controllers: [HealthcheckController, RegistrationLoggerController, MailerLoggerController],
  providers: [],
})
export class AppModule {
}
