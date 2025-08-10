import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [configProvider],
  exports: [configProvider],
})
export class AppConfigModule {}
