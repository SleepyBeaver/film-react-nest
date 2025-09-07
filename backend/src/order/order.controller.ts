import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderData: CreateOrderDTO) {
    return this.orderService.create(orderData);
  }
}
