import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/film.entity';
import { Schedule } from '../films/schedule.entity';
import { FilmDTO } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmDTO[]> {
    const films = await this.filmRepo.find({ relations: ['schedule'] });
    return films as unknown as FilmDTO[];
  }

  async findById(id: string): Promise<FilmDTO | null> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return (film as unknown as FilmDTO) ?? null;
  }

  async updateFilmSession(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.scheduleRepo.update({ id: sessionId }, { taken: takenSeats });
  }
}
