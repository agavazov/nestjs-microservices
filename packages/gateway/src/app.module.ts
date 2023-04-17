import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Config module is using for load .env data
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // Which files to load
      cache: true, // Get the (env) data once and cache for better performance
    }),

    // Project modules
    ClientModule,
    SettingsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
