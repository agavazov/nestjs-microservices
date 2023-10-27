import { Transport } from '@nestjs/microservices';
import { ClientsModuleOptions } from '@nestjs/microservices/module/interfaces';
import { appConfig } from './app.config';

export const microservicesList: ClientsModuleOptions = [
  {
    name: 'MAILER',
    transport: Transport.TCP,
    options: {
      host: String(appConfig.msMailerHost),
      port: Number(appConfig.msMailerPort),
    },
  },
  {
    name: 'STATS',
    transport: Transport.TCP,
    options: {
      host: String(appConfig.msStatsHost),
      port: Number(appConfig.msStatsPort),
    },
  },
  {
    name: 'USERS',
    transport: Transport.TCP,
    options: {
      host: String(appConfig.msUsersHost),
      port: Number(appConfig.msUsersPort),
    },
  },
];
