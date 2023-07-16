import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 4334,
  cpf: '12345678900',
  email: 'emailmock@email.com',
  name: 'Name Mock',
  password: '$2b$10$I4E5zqoDFh/IK7c6HIXg4.Z6ZsOKVvqTMZfIoyb17MQbJB2YnUS2S',
  phone: '12345678900',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
