import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { createUserDto, updateUserDto } from './user.dto';
import { LoginDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) {}

   allUsers() {
      return this.prisma.user.findMany();
    }

    getUser(dto: LoginDto) {
      return this.prisma.user.findFirst({
        where: {
          OR: [
            { email: dto.email },
            { username: dto.username },
            { phone: dto.phone },
          ],
        },
      });
    }

    getUserById(id: number) {
      return this.prisma.user.findUnique({
        where: { id },
      });
    }

    async createUser(dto: createUserDto) {
      return await this.prisma.$transaction(async (prisma) => {
        const roleUser = await prisma.roles.findFirst({
          where: {
            name: 'USER'
          }
        });

        const newUser = await prisma.user.create({
          data: {
            ...dto,
            roles: {
              create: {
                role_id: roleUser.id
              }
            }
          },
        });

        return newUser;
      })
    }

    updateUser(id: number, dto: Partial<updateUserDto>) {
      return this.prisma.user.update({
        where: { id },
        data: dto,
      });
    }

    deleteUser(id: number) {
      return this.prisma.user.update({
        where: { id },
        data: {
          isActive: false,
        }
      });
    }
}
