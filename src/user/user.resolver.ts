import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { Md5 } from 'ts-md5';

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
}
