import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field()
  id: number;

  @Field()
  username?: string;

  @Field()
  email?: string;

  @Field()
  phone?: string;

  @Field()
  token?: string;
}