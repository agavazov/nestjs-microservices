import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import process from 'process';
import { AppConfigService } from 'nestjs-microservices-gateway/dist/src/shared/app-config.service';
import { SharedModule } from 'nestjs-microservices-gateway/dist/src/shared/shared.module';

const registry = [
  ClientsModule.registerAsync([
    {
      name: 'MAILER',
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: process.env.MS_MAILER_HOST,
          port: process.env.MS_MAILER_PORT,
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
          host: process.env.MS_STATS_HOST,
          port: process.env.MS_STATS_PORT,
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
          host: process.env.MS_USERS_HOST,
          port: process.env.MS_USERS_PORT,
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
