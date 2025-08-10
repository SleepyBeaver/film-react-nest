import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmDTO[]> {
    return this.filmsRepository.findAll();
  }

  async findOne(id: string): Promise<FilmDTO | null> {
    return this.filmsRepository.findById(id);
  }
}
