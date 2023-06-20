import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@application/auth/auth.service';
import { UserRepository } from '@application/repositories/user-repositories';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;
      request.user = await this.userRepository.findById(data.id);

      return true;
    } catch (error) {
      return false;
    }
  }
}
