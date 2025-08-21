CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Таблица фильмов
CREATE TABLE films (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    about TEXT,
    description TEXT,
    rating FLOAT,
    director VARCHAR(255),
    tags TEXT[],
    image VARCHAR(255),
    cover VARCHAR(255)
);

-- Таблица расписаний
CREATE TABLE schedules (
    id UUID PRIMARY KEY,
    film_id UUID REFERENCES films(id) ON DELETE CASCADE,
    daytime TIMESTAMPTZ NOT NULL,
    hall INT,
    rows INT,
    seats INT,
    price INT,
    taken TEXT[] DEFAULT '{}'
);
