import { faker } from '@faker-js/faker';
import { CustomerResponseDto } from '../../../../index';

export const CustomerMock: CustomerResponseDto = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  externalId: faker.string.uuid(),
  language: faker.string.alpha(2),
  frequencyPayment: faker.helpers.arrayElement([
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'YEARLY',
  ]),
  createdBy: faker.string.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
};
