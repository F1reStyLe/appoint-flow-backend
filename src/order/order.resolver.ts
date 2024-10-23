import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderModel } from './order.model';
import { createOrderDto, findOrderDto, updateOrderDto } from './order.dto';

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderModel], { name: 'findorder' })
  async findOrder(
    @Args('orderId', { nullable: true }) orderId?: number,
    @Args('userId', { nullable: true }) userId?: number,
    @Args('createdAt', { nullable: true } ) createdAt?: Date,
    @Args('comSign', { nullable: true } ) comSign?: string,
  ): Promise<OrderModel[]> {
    const findData: Partial<findOrderDto> = {};

    if (orderId) findData.orderId = orderId;
    if (userId) findData.userId = userId;
    if (createdAt) findData.createdAt = createdAt;
    if (comSign) findData.comSign = comSign;

    return this.orderService.findOrder(findData);
  }

  @Mutation(() => OrderModel, { name: 'createOrder' })
  async createOrder(
    @Args('createOrderDto') createOrderDto: createOrderDto,
  ): Promise<OrderModel> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Mutation(() => OrderModel, { name: 'updateOrder' })
  async updateOrder(
    @Args('updateOrderDto') updateOrderDto: updateOrderDto,
  ): Promise<OrderModel> {
    if (!updateOrderDto.newMenuId) updateOrderDto.newMenuId = updateOrderDto.menuId;

    return this.orderService.updateOrder(updateOrderDto);
  }
}