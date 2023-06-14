import { User } from '@application/entities/user.entity';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
    };
  }
}
