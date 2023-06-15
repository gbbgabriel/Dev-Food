import { UserRepository } from '@application/repositories/user-repositories';
import { User } from '@application/entities/user.entity';
import { Injectable } from '@nestjs/common';

interface ShowUserUserResponse {
  user: User;
}

@Injectable()
export class ShowUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id): Promise<ShowUserUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }
}
