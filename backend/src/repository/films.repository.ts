import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/films.schema';
import { FilmDTO } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDTO[]> {
    return this.filmModel.find().lean().exec();
  }

  async findById(id: string): Promise<FilmDTO | null> {
    return this.filmModel.findOne({ id }).lean().exec();
  }

  async updateFilmSession(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $set: { 'schedule.$.taken': takenSeats } },
      )
      .exec();
  }
}
