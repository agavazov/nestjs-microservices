import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Project modules
    ClientModule,
    SettingsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
