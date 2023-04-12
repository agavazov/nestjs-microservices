import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConfigService } from '../shared/app-config.service';
import { SharedModule } from '../shared/shared.module';

const registry = [
  ClientsModule.registerAsync([
    {
      name: 'MAILER',
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: config.msMailerHost,
          port: config.msMailerPort,
        },
      }),
    },
    {
      name: 'STATS',
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: config.msStatsHost,
          port: config.msStatsPort,
        },
      }),
    },
    {
      name: 'USERS',
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: config.msUsersHost,
          port: config.msUsersPort,
        },
      }),
    },
  ]),
];

@Module({
  imports: [...registry],
  exports: [...registry],
})
export class MicroservicesModule {}
