import { IsString, IsDecimal, IsNumber } from "class-validator";

export class createMenuDto {
  @IsString()
  name: string;

  @IsDecimal()
  price: number;

  @IsString()
  image?: string;

  @IsString()
  description?: string;
}

export class updateMenuDto {
  @IsNumber()
  id: number;

  @IsString()
  name?: string;

  @IsDecimal()
  price?: number;

  @IsString()
  image?: string;

  @IsString()
  description?: string;
}