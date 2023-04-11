import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConfigService } from '../shared/app-config.service';
import { SharedModule } from '../shared/shared.module';

const registry = [
  ClientsModule.registerAsync([
    {
      name: 'AUTH',
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        transport: Transport.TCP, // Strongly recommend to use MQ -> https://docs.nestjs.com/microservices/rabbitmq
        options: {
          host: config.msAuthHost,
          port: config.msAuthPort,
        },
      }),
    },
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
  ]),
];

@Module({
  imports: [...registry],
  exports: [...registry],
})
export class MicroservicesModule {}
