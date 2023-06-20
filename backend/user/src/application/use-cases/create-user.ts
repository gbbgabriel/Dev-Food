import { Email } from '@application/entities/email.entity copy';
import { Name } from '@application/entities/name.entity';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user-repositories';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

    const userAlreadyExists = await this.userRepository.findByEmail(
      new Email(email),
    );

    if (userAlreadyExists) {
      throw new UnprocessableEntityException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: new Name(name),
      email: new Email(email),
      password: hashedPassword,
      role: 'user',
    });

    await this.userRepository.create(user);

    return { user };
  }
}
