import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthcheckController } from './healthcheck.controller';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RegistrationController, HealthcheckController],
  providers: [],
})
export class AppModule {
}
