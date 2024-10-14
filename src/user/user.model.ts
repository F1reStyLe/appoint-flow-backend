import { Field, Float, Int, ObjectType, registerEnumType } from "@nestjs/graphql";


enum Role {
  ADMIN,
  USER
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class UserModel {
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

  @Field(() => Role)
  role: Role;

  @Field(() => Date)
  birthday: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

