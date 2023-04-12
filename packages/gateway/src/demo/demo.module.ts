import { Module } from '@nestjs/common';
import { MicroservicesModule } from '../microservices/microservices.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [MicroservicesModule],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
