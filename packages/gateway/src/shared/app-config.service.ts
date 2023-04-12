import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  // App
  host: string; // Service host
  port: number; // Service port

  // Microservices
  msMailerHost: string;
  msMailerPort: number;
  msStatsHost: string;
  msStatsPort: number;
  msUsersHost: string;
  msUsersPort: number;

  constructor(private configService: ConfigService) {
    this.host = String(configService.get('HOST', '127.0.0.1'));
    this.port = Number(configService.get('PORT', 3000));

    this.msMailerHost = String(configService.get('MS_MAILER_HOST'));
    this.msMailerPort = Number(configService.get('MS_MAILER_PORT'));
    this.msStatsHost = String(configService.get('MS_STATS_HOST'));
    this.msStatsPort = Number(configService.get('MS_STATS_PORT'));
    this.msUsersHost = String(configService.get('MS_USERS_HOST'));
    this.msUsersPort = Number(configService.get('MS_USERS_PORT'));
  }
}
