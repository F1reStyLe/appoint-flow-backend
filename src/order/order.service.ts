import { Injectable } from '@nestjs/common';
import { createOrderDto, findOrderDto, updateOrderDto } from './order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrder(dto: findOrderDto) {
    let orders = await this.prisma.order.findMany({
      where: {
        OR: [
          {
            id: dto.orderId,
          },
          {
            user_id: dto.userId,
          },
        ]
      },
      include: {
        consists: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
                price: true,
              }
            }
          },
        },
        user: true,
      }
    });

    if (dto.createdAt) {
      orders = orders.filter(order => {
        switch (dto.comSign.toLowerCase()) {
          case 'gt':
            return order.createdAt > dto.createdAt;
          case 'gte':
            return order.createdAt >= dto.createdAt;
          case 'lt':
            return order.createdAt < dto.createdAt;
          case 'lte':
            return order.createdAt <= dto.createdAt;
          default:
            return order.createdAt === dto.createdAt;
        }
      });
    }

    return orders.map(order => ({
      id: order.id,
      userId: order.user_id,
      orderId: order.order_id,
      consists: order.consists,
      user: order.user,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));
  }

  async createOrder(dto: createOrderDto) {
      return await this.prisma.$transaction(async (prisma) => {
            const orderId = await this.prisma.order.aggregate({
              _max: { id: true, },
          });

      orderId._max.id += 1;

      const order = await prisma.order.create({
        data: {
          user: {
            connect: { id: dto.userId },
          },
          order_id: orderId._max.id,
          consists: {
            create: dto.menu.map(item => ({
              menuItem: { connect: { id: item.id } },
              quantity: item.quantity,
            })),
          },
        },
        include: {
          consists: {
            include: {
              menuItem: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                }
              },
            },
          },
          user: true,
        },
      });

      return {
              id: order.id,
              userId: order.user_id,
              orderId: order.order_id,
              consists: order.consists,
              user: order.user,
              createdAt: order.createdAt,
              updatedAt: order.updatedAt,
        };
    });
  }

  async updateOrder(dto: updateOrderDto) {
    return await this.prisma.$transaction(async (prisma) => {
      await prisma.orderMenu.update({
        where: {
          orderId_menuId: {
            orderId: dto.orderId,
            menuId: dto.menuId
          }
        },
        data: {
          quantity: dto.quantity,
          menuId: dto.newMenuId
        }
      });

      const completeOrder = await prisma.order.findUnique({
        where: {
          id: dto.orderId
        },
        include: {
          consists: {
            include: {
              menuItem: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                }
              }
            },
          },
          user: true,
        }
      });

      return {
        id: completeOrder.id,
        userId: completeOrder.user_id,
        orderId: completeOrder.order_id,
        consists: completeOrder.consists,
        user: completeOrder.user,
        createdAt: completeOrder.createdAt,
        updatedAt: completeOrder.updatedAt
      };
    });
  }

  async deleteOrder(orderId: number) {
    return await this.prisma.$transaction(async (prisma) => {
      return await prisma.order.delete({
        where: {
          id: orderId
        },
      });
    })
  }
}