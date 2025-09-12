import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Должен вызывать OrderService.create при создании заказа', async () => {
    const dto: CreateOrderDTO = {
      filmId: '1',
      scheduleId: 's1',
      seats: ['1', '2', '3'],
    };

    mockOrderService.create.mockResolvedValueOnce({ id: '123', ...dto });

    const result = await controller.create(dto);

    expect(result).toEqual({ id: '123', ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
