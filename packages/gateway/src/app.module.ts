import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
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

    // Events module
    EventEmitterModule.forRoot({
      // Set this to `true` to use wildcards
      wildcard: true,
      // The delimiter used to segment namespaces
      delimiter: '.',
      // Set this to `true` if you want to emit the newListener event
      newListener: false,
      // Set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // The maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // Show event name in memory leak message when more than max amount of listeners is assigned
      verboseMemoryLeak: false,
      // Disable throwing uncaughtException if an error event is emitted, and it has no listeners
      ignoreErrors: false,
    }),

    // Project modules
    SettingsModule,
    DemoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
