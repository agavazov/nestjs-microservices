import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: process.env.PORT,
    },
  });
  await app.listen();

  console.log(`MS listen at tcp://127.0.0.1:${process.env.PORT}`);
}
bootstrap().catch(console.error);
