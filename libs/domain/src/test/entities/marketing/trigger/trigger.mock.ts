import { faker } from '@faker-js/faker';
import { TriggerResponseDto } from '../../../../../src';

export const TriggerMock: TriggerResponseDto = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  content: faker.string.alpha(3),
  description: faker.string.alpha(3),
  createdBy: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  type: 'PHONE',
  status: faker.string.alpha(3),
};
