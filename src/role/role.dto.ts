import { Field, InputType } from "@nestjs/graphql";

@InputType()
class createRoleDto {
  @Field()
  name: string;

  @Field()
  permissions?: number;
}

@InputType()
class RoleDto {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  permissions?: number;
}

@InputType()
class GrantRoleDto {
  @Field({nullable: true})
  user_id?: number;

  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  phone?: string;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  id?: number;
}

export { createRoleDto, RoleDto, GrantRoleDto };