import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config.module';
import { ConfigToken } from './app.config.provider';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigToken],
      useFactory: (config: any) => ({
        uri: config.database.url,
      }),
    }),
  ],
})
export class DatabaseModule {}
