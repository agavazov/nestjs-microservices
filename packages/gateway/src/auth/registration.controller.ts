import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegistrationDto } from './dto/registration.dto';

@Controller('/auth/registration')
export class RegistrationController {
  constructor(
    @Inject('AUTH') private readonly msAuth: ClientProxy,
    @Inject('MAILER') private readonly msMailer: ClientProxy,
  ) {}

  @Post('/')
  protected async createUser(@Body() data: RegistrationDto) {
    const message = await firstValueFrom(
      this.msMailer.send<boolean>('auth.registration', data),
    );

    this.msMailer.emit<number>(
      'user_created',
      'gateway date' + Date().toString(),
    );

    console.log('>>> message', message);

    return { success: true };
  }
}
