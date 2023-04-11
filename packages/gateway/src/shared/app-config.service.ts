import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  // App
  host: string; // Service host
  port: number; // Service port

  // Microservices
  msAuthHost: string;
  msAuthPort: number;
  msMailerHost: string;
  msMailerPort: number;

  constructor(private configService: ConfigService) {
    this.host = String(configService.get('HOST', '127.0.0.1'));
    this.port = Number(configService.get('PORT', 3000));

    this.msAuthHost = String(configService.get('MS_AUTH_HOST'));
    this.msAuthPort = Number(configService.get('MS_AUTH_PORT'));
    this.msMailerHost = String(configService.get('MS_MAILER_HOST'));
    this.msMailerPort = Number(configService.get('MS_MAILER_PORT'));
  }
}
