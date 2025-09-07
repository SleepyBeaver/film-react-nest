// src/app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    DatabaseModule,
    FilmsModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
