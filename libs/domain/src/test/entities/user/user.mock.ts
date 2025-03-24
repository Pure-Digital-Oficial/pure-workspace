import { faker } from '@faker-js/faker';
import { UserResponseDto } from '../../../../src';
import { AuthMock } from '../auth';

export const UserMock: UserResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  nickname: faker.string.alpha(3),
  birthDate: faker.date.birthdate(),
  type: 'ADMIN',
  auth: AuthMock,
};
