import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(orderData: CreateOrderDTO) {
    const { tickets, email, phone } = orderData;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const filmEntity = await this.filmsRepository.findById(film);
      if (!filmEntity) {
        throw new BadRequestException(`Фильм с id ${film} не найден`);
      }

      const schedule = filmEntity.schedule.find((s) => s.id === session);
      if (!schedule) {
        throw new BadRequestException(`Сеанс с id ${session} не найден`);
      }

      const seatKey = `${row}_${seat}`;
      if (schedule.taken.includes(seatKey)) {
        throw new BadRequestException(
          `Место ${row}-${seat} уже занято на сеанс ${session}`,
        );
      }

      schedule.taken.push(seatKey);
      await this.filmsRepository.updateFilmSession(
        film,
        session,
        schedule.taken,
      );
    }

    return {
      message: 'Бронирование успешно',
      email,
      phone,
      tickets,
    };
  }
}
