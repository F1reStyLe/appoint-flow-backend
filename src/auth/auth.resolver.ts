import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthModel } from './auth.model';


@Resolver()
export class AuthResolver {
  constructor(private readonly AuthService: AuthService) {}

  @Query(() => AuthModel, { name: 'auth' })
  async authUser(
    @Args('password') password: string,
    @Args('username', { nullable: true } ) username?: string,
    @Args('email', { nullable: true } ) email?: string,
    @Args('phone', { nullable: true } ) phone?: string,
  ): Promise<AuthModel> {
    const authUserData: Partial<LoginDto> = { password };

    if (email) authUserData.email = email;
    if (phone) authUserData.phone = phone;
    if (username) authUserData.username = username;

    const token = await this.AuthService.login(authUserData);
    return { token: token.token };
  }
}