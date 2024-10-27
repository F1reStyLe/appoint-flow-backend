import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginDto {
  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  phone?: string;

  @Field({nullable: true})
  email?: string;

  @Field()
  password: string;
}