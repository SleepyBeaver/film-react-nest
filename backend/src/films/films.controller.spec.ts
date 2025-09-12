import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Должен вернуть список фильмов', async () => {
    mockFilmsService.findAll.mockResolvedValueOnce([
      { id: '1', title: 'Film 1' },
    ]);

    const result = await controller.findAll();

    expect(result).toEqual({
      total: 1,
      items: [{ id: '1', title: 'Film 1' }],
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('Должен вернуть расписание фильма', async () => {
    mockFilmsService.findOne.mockResolvedValueOnce({
      id: '1',
      title: 'Film 1',
      schedule: [{ id: 's1', daytime: '2025-09-02T12:00:00Z' }],
    });

    const result = await controller.findSchedule('1');

    expect(result).toEqual({
      total: 1,
      items: [{ id: 's1', daytime: '2025-09-02T12:00:00Z' }],
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('Должен кидать NotFoundException, если фильм не найден', async () => {
    mockFilmsService.findOne.mockResolvedValueOnce(null);

    await expect(controller.findSchedule('999')).rejects.toThrow(
      new NotFoundException('Фильм с id 999 не найден'),
    );
  });
});
