import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
class RoleModel {
  @Field()
  id?: number;

  @Field()
  name?: string;

  @Field()
  permissions?: number;
}

export { RoleModel };