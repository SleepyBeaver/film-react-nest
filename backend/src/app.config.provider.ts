import { ConfigModule } from '@nestjs/config';

export const ConfigToken = 'CONFIG';

export const configProvider = {
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  provide: ConfigToken,
  useValue: <AppConfig>{
    database: {
      type: process.env.DATABASE_DRIVER || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      name: process.env.DATABASE_NAME || 'afisha',
      synchronize: false,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  type: 'postgres' | 'mysql' | 'sqlite';
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
}
