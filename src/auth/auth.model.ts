import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field()
  token: string;
}