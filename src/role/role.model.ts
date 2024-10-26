import { Field, ObjectType } from "@nestjs/graphql";
import { UserModel } from "../user/user.model";


@ObjectType()
class RoleModel {
  @Field()
  id?: number;

  @Field()
  name?: string;

  @Field()
  permissions?: number;
}

@ObjectType()
class GrantRoleModel {
  @Field()
  id?: number;

  @Field()
  role: RoleModel;

  @Field()
  user: UserModel;
}

export { RoleModel, GrantRoleModel };