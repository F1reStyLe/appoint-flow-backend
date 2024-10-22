import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class createOrderDto {
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