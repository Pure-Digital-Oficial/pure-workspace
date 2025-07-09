import { faker } from '@faker-js/faker';
import { HistoryShotResponseDto } from '../../../../../../src';

export const HistoryShotMock: HistoryShotResponseDto = {
  id: faker.string.uuid(),
  status: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  clickedAt: faker.date.anytime(),
  oppenedAt: faker.date.anytime(),
  shotedAt: faker.date.anytime(),
  clickedInLink: true,
  oppened: true,
  shotId: faker.string.uuid(),
  targetId: faker.string.uuid(),
};
