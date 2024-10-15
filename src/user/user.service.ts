import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createUserDto, updateUserDto } from './user.dto';

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) {}

   allUsers() {
      return this.prisma.user.findMany();
    }

    getUserById(id: number) {
      return this.prisma.user.findUnique({
        where: { id },
      });
    }
  
    createUser(dto: createUserDto) {
      return this.prisma.user.create({
        data: dto,
      });
    }

    updateUser(id: number, dto: Partial<updateUserDto>) {
      return this.prisma.user.update({
        where: { id },
        data: dto,
      });
    }
}
