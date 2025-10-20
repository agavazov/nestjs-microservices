import { NestFactory } from '@nestjs/core';
import { colors } from 'colors.ts';
import { appConfig } from './app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Listen
  await app.listen(appConfig.port, appConfig.host, () => {
    console.log(colors('green',`Gateway listening on http://${appConfig.host}:${appConfig.port}`));
  });
}

bootstrap().catch(console.error);
