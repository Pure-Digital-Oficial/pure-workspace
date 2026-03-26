import { faker } from '@faker-js/faker';
import { PaymentHistoryResponseDto } from '../../../../../index';

export const PaymentHistoryMock: PaymentHistoryResponseDto = {
  id: faker.string.uuid(),
  externalId: faker.number.int({ min: 2 }),
  characterId: faker.string.uuid(),
  customerId: faker.string.uuid(),
  planId: faker.string.uuid(),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
  createdBy: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.future(),
  amount: faker.number.int({ min: 2 }),
};
