import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.user === undefined) {
      throw new NotFoundException(
        'Usuário não encontrado no request. Use o AuthGuard na rota',
      );
    }
    return request.user;
  },
);
