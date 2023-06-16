import { Email } from '@application/entities/email.entity copy';
import { Name } from '@application/entities/name.entity';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user-repositories';
import { Injectable } from '@nestjs/common';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = request;

    const user = new User({
      name: new Name(name),
      email: new Email(email),
      password,
      role: 'user',
    });

    await this.userRepository.create(user);

    return { user };
  }
}
