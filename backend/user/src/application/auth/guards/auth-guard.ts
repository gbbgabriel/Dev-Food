import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ShowUser } from '@application/use-cases/show-user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly showUser: ShowUser,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    console.log(authorization);

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      request.user = await this.showUser.execute(data.id);

      return true;
    } catch (error) {
      return false;
    }
  }
}
