import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createUserDto } from './user.dto';

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) {}

   findAll() {
      return this.prisma.user.findMany();
    }
  
    create(dto: createUserDto) {
      return this.prisma.user.create({
        data: dto,
      });
    }
}
