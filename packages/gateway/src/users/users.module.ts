import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesList } from '../microservices-list';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [
    // Register all microservices
    ClientsModule.register(microservicesList),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class UsersModule {}
