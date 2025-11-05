import { faker } from '@faker-js/faker';
import { FixedGainResponseDto } from '../../../../index';

export const FixedGainMock: FixedGainResponseDto = {
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  value: faker.number.float(),
  status: 'ACTIVE',
  dayOfReceipt: faker.number.float(),
  loggedUserId: faker.string.uuid(),
  frequency: 'DAILY',
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  createdBy: faker.string.uuid(),
};
