import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { colors } from 'colors.ts';
import { appConfig } from './app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: appConfig.host,
      port: appConfig.port,
    },
  });
  await app.listen();

  console.log(colors('yellow',`STATS listening on tcp://${appConfig.host}:${appConfig.port}`));
}
bootstrap().catch(console.error);
