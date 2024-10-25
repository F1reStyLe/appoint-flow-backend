import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createRoleDto, RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRoles() {
    const roles = await this.prisma.roles.findMany();

    return roles.map(role => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions,
    }));
  }

  async getRole(dto: Partial<RoleDto>) {
    return await this.prisma.roles.findFirst({
      where: {
        OR: [
          {
            id: dto.id
          },
          {
            name: dto.name
          }
        ]
      },
    });
  }

  async createRole(dto: createRoleDto) {
    return await this.prisma.roles.create({
      data: {
        ...dto
      },
    });
  }

  async updateRole(id: number, dto: Partial<RoleDto>) {
    const newRole = await this.prisma.roles.update({
      where: { id: id },
      data: {
        ...dto
      }
    });

    return newRole;
  }

  async deleteRole(id: number) {
    return await this.prisma.roles.delete({
      where: { id: id },
    });
  }
}
