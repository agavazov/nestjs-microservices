import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DemoListener {
  @OnEvent('auth.registration')
  registration(payload: any) {
    console.log('demo-listener.service -> auth.registration', payload);
  }

  @OnEvent('**')
  all(payload: any) {
    console.log('demo-listener.service -> any', payload);
  }
}
