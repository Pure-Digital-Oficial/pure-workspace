import { SessionResponseDto } from '../../../../src';
import { UserMock } from '../user';
import { faker } from '@faker-js/faker';

export const SessionMock: SessionResponseDto = {
  id: UserMock.id,
  nickname: UserMock.nickname,
  picture: faker.image.avatar(),
  status: 'ACTIVE',
  type: UserMock.type,
};
