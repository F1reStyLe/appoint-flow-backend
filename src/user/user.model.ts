import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";


@ObjectType()
class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phone: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export { UserModel };
