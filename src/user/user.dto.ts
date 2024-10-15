import { IsDate, IsString } from 'class-validator';


enum Role {
  ADMIN,
  USER
}

export class createUserDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class updateUserDto {
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