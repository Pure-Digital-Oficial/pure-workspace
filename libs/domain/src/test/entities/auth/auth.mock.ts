import { faker } from '@faker-js/faker';
import { AuthResponseDto } from '../../../../src';
import { UserMock } from '../user';

export const AuthMock: AuthResponseDto = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  userId: UserMock.id,
  password: faker.internet.password(),
};
