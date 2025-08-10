import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(orderData: CreateOrderDTO) {
    const { filmId, scheduleId, seats } = orderData;

    const film = await this.filmsRepository.findById(filmId);
    if (!film) {
      throw new BadRequestException(`Фильм с id ${filmId} не найден`);
    }

    const schedule = film.schedule.find((s) => s.id === scheduleId);
    if (!schedule) {
      throw new BadRequestException(`Сеанс с id ${scheduleId} не найден`);
    }

    const alreadyTaken = seats.filter((seat) => schedule.taken.includes(seat));
    if (alreadyTaken.length > 0) {
      throw new BadRequestException(
        `Места ${alreadyTaken.join(', ')} уже заняты`,
      );
    }

    const updatedTaken = [...schedule.taken, ...seats];
    await this.filmsRepository.updateFilmSession(
      filmId,
      scheduleId,
      updatedTaken,
    );

    return {
      message: 'Бронирование успешно',
      filmId,
      scheduleId,
      bookedSeats: seats,
    };
  }
}
