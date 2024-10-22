import { Injectable } from '@nestjs/common';
import { createOrderDto } from './order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

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

      console.log(order);
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
}