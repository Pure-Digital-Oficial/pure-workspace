import { faker } from '@faker-js/faker';
import { ShotModelResponseDto } from '../../../../../../src';

export const ShotModelMock: ShotModelResponseDto = {
  id: faker.string.uuid(),
  createdBy: faker.string.uuid(),
  sender: faker.string.alpha(3),
  title: faker.string.alpha(3),
  subject: faker.string.alpha(3),
  body: faker.string.alpha(3),
  image: faker.string.alpha(3),
  status: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
