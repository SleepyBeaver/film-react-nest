import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  filmId: string;

  @IsString()
  scheduleId: string;

  @IsArray()
  @ArrayNotEmpty()
  seats: string[];
}
