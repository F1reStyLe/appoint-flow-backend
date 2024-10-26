import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [RoleResolver, RoleService, PrismaService, UserService],
})
export class RoleModule {}
