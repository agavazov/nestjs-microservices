import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DemoModule } from './demo/demo.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    // Config module is using for load .env data
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // Which files to load
      cache: true, // Get the (env) data once and cache for better performance
    }),

    // Project modules
    SettingsModule,
    DemoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
