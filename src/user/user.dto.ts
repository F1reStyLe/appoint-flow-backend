import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

@InputType()
class createUserDto {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

class updateUserDto {
  @IsString()
  username?: string;

  @IsString()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  phone?: string;

  @IsDate()
  birthday?: Date;
}

export { createUserDto, updateUserDto };