import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export const appConfig = {
  host: String(process.env.HOST),
  port: Number(process.env.PORT),

  msMailerHost: String(process.env.MS_MAILER_HOST),
  msMailerPort: Number(process.env.MS_MAILER_PORT),

  msStatsHost: String(process.env.MS_STATS_HOST),
  msStatsPort: Number(process.env.MS_STATS_PORT),

  msUsersHost: String(process.env.MS_USERS_HOST),
  msUsersPort: Number(process.env.MS_USERS_PORT),
};
