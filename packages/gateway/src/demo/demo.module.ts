import { Module } from '@nestjs/common';
import { MicroservicesModule } from '../microservices/microservices.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { DemoListener } from './listeners/demo-listener.service';

@Module({
  imports: [MicroservicesModule],
  controllers: [DemoController],
  providers: [DemoService, DemoListener],
})
export class DemoModule {}
