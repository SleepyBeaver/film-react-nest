import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { Schedule } from './schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsService, FilmsRepository],
})
export class FilmsModule {}