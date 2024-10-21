import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MenuModel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  image?: string;

  @Field()
  description?: string;
}