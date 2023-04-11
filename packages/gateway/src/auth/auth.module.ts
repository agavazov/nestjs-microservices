import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from '../shared/app-config.service';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [],
  controllers: [RegistrationController],
  providers: [RegistrationService, AppConfigService, ConfigService],
})
export class AuthModule {}
