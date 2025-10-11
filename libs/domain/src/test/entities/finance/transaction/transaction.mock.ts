import { faker } from '@faker-js/faker';
import { TransactionResponseDto } from '../../../../index';

export const TransactionMock: TransactionResponseDto = {
  id: faker.string.uuid(),
  category: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  name: faker.commerce.productName(),
  status: faker.string.alpha(3),
  type: faker.string.alpha(3),
  createdBy: faker.person.fullName(),
  value: faker.number.int({ min: 1, max: 1000 }),
};
