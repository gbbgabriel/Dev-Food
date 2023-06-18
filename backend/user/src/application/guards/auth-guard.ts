import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ShowUser } from '@application/use-cases/show-user';
import { AuthService } from '@application/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly showUser: ShowUser,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;
      request.user = await this.showUser.execute(data.id);

      console.log(request.user.user.role);
      return true;
    } catch (error) {
      return false;
    }
  }
}
