import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthcheckController } from './healthcheck.controller';
import { RegistrationLoggerController } from './registration-logger.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RegistrationLoggerController, HealthcheckController],
  providers: [],
})
export class AppModule {
}
