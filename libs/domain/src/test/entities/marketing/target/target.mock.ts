import { faker } from '@faker-js/faker';
import { TargetResponseDto } from '../../../../../src';
import { TriggerMock } from '../trigger';

export const TargetMock: TargetResponseDto = {
  id: faker.string.uuid(),
  triggerId: TriggerMock.id,
  content: faker.string.alpha(3),
  createdBy: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  status: faker.string.alpha(3),
  internalStatus: faker.string.alpha(3),
};
