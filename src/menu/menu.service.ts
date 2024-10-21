import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { createMenuDto, updateMenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  getAllFromMenu() {
    return this.prisma.menu.findMany();
  }

  getMenyByName(name: string) {
    return this.prisma.menu.findFirst({
      where: {
        name,
      },
    });
  }

  getMenuById(id: number) {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  }

  createMenu(dto: createMenuDto) {
    return this.prisma.menu.create({
      data: dto,
    });
  }

  updateMenu(id: number, dto: Partial<updateMenuDto>) {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteMenu(ids: number[]) {
    return this.prisma.$transaction(
      ids.map(id => this.prisma.menu.delete({ where: { id } }))
    );
  }
}
