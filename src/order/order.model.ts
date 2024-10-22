import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  username: string;
}

@ObjectType()
class MenuItem {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;
}

@ObjectType()
class OrderMenuItem {
  @Field()
  menuId: number;

  @Field()
  quantity: number;

  @Field(() => MenuItem)
  menuItem: MenuItem;
}

@ObjectType()
export class OrderModel {
  @Field()
  id: number;

  @Field()
  userId: number;

  @Field(() => User)
  user: User;

  @Field(() => [OrderMenuItem])
  consists: OrderMenuItem[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
