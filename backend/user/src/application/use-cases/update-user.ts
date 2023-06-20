import { Email } from '@application/entities/email.entity copy';
import { Name } from '@application/entities/name.entity';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user-repositories';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

    console.log(userId);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (email) {
      const userAlreadyExists = await this.userRepository.findByEmail(
        new Email(email),
      );

      if (userAlreadyExists && userAlreadyExists.id != user.id) {
        throw new ConflictException('Usuário já existe.');
      }
    }

    user.name = new Name(name ?? user.name.value);
    user.email = new Email(email ?? user.email.value);
    user.role = role ?? user.role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
    } else {
      user.password = user.password;
    }

    await this.userRepository.update(user);

    return { user };
  }
}
