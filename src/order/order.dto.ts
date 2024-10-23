import { InputType, Field } from '@nestjs/graphql';

@InputType()
class createOrderDto {
  @Field()
  userId: number;

  @Field(() => [MenuItemInput])
  menu: MenuItemInput[];
}

@InputType()
class MenuItemInput {
  @Field()
  id: number;

  @Field()
  quantity: number;
}

class findOrderDto {
  @Field({ nullable: true })
  orderId?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  comSign?: string;
}

export { createOrderDto, findOrderDto };