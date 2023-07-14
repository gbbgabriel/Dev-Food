import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 4334,
  cpf: '12345678900',
  email: 'emailmock@email.com',
  name: 'Name Mock',
  password: '123456',
  phone: '12345678900',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
