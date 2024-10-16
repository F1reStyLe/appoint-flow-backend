import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { Md5 } from 'ts-md5';
import { updateUserDto } from './user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'users' })
  allUsers() {
    return this.userService.allUsers();
  }

  @Query(() => UserModel, { name: 'user' })
  async getUserById(@Args('id') id: number) {
    const user = await this.userService.getUserById(id);
    if(!user) {
      throw new Error(`User by id: ${id} not found`);
    }
    return user;
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  async createUser(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string) {
      password = Md5.hashStr(password);
      return this.userService.createUser({
        username,
        email,
        password,
    });
  }

  @Mutation(() => UserModel, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: number,
    @Args('username', { nullable: true } ) username?: string,
    @Args('email', { nullable: true } ) email?: string,
    @Args('password', { nullable: true } ) password?: string,
    @Args('phone', { nullable: true } ) phone?: string,
    @Args('birthday', { nullable: true } ) birthday?: Date
  ) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    const updateData: Partial<updateUserDto> = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = Md5.hashStr(password);
    if (phone) updateData.phone = phone;
    if (birthday) updateData.birthday = birthday;
    return this.userService.updateUser(id, updateData);
  }

  @Mutation(() => UserModel, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.userService.deleteUser(id);
  }
}
