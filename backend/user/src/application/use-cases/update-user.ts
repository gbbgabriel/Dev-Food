import { Email } from '@application/entities/email.entity copy';
import { Name } from '@application/entities/name.entity';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user-repositories';
import { Injectable } from '@nestjs/common';

interface UpdateUserRequest {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

interface UpdateUserResponse {
  user: User;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId, name, email, password, role } = request;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    user.name = new Name(name ?? user.name.value);
    user.email = new Email(email ?? user.email.value);
    user.password = password ?? user.password;
    user.role = role ?? user.role;

    await this.userRepository.update(user);

    return { user };
  }
}
