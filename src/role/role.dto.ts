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

export { createRoleDto, RoleDto};