import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';

@Module({
  imports: [],
  controllers: [DemoController],
  providers: [],
})
export class ClientModule {}
