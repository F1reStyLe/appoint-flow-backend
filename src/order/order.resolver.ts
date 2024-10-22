import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderModel } from './order.model';
import { createOrderDto } from './order.dto';

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderModel, { name: 'createOrder' })
  async createOrder(
    @Args('createOrderDto') createOrderDto: createOrderDto,
  ): Promise<OrderModel> {
    return this.orderService.createOrder(createOrderDto);
  }
}