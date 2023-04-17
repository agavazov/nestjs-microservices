import { Module } from '@nestjs/common';
import { MicroservicesModule } from '../microservices/microservices.module';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [MicroservicesModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class UsersModule {}
