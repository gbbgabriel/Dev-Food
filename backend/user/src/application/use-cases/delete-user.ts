import { UserRepository } from '@application/repositories/user-repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    console.log(userId);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    console.log(user.id);
    await this.userRepository.delete(user.id);
  }
}
