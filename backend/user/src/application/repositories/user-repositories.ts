import { Email } from '@application/entities/email.entity copy';
import { User } from '@application/entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract update(user: User): Promise<User | null>;
  abstract delete(userId: string): Promise<void>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
}
