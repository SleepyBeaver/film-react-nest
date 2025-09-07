import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryColumn('uuid')
  id: string; // мы храним внешний UUID (из фронта/фикстур)

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  about: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column('float', { nullable: true })
  rating: number;

  @Column({ nullable: true })
  director: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}