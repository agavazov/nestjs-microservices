import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Listen
  const config = app.get(AppConfigService);
  await app.listen(config.port, config.host, () => {
    console.log(`Listen on http://${config.host}:${config.port}`);
  });
}

bootstrap().catch(console.error);
