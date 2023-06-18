import { Email } from '@application/entities/email.entity copy';
import { Name } from '@application/entities/name.entity';
import { User } from '@application/entities/user.entity';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static toDomain(raw: RawUser) {
    return new User(
      {
        name: new Name(raw.name),
        email: new Email(raw.email),
        password: raw.password,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
