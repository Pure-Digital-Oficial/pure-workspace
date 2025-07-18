import { faker } from '@faker-js/faker';
import { ShotResponseDto } from '../../../../..';

export const ShotMock: ShotResponseDto = {
  id: faker.string.uuid(),
  createdBy: faker.string.uuid(),
  title: faker.string.alpha(3),
  status: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  scheduled: true,
  modelId: faker.string.uuid(),
};
