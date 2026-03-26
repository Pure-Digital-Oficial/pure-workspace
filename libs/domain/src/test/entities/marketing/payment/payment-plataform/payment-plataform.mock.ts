import { faker } from '@faker-js/faker';
import { PaymentPlataformResponseDto } from '../../../../../index';

export const PaymentPlataformMock: PaymentPlataformResponseDto = {
  id: faker.string.uuid(),
  title: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  key: faker.string.uuid(),
  secretKey: faker.string.uuid(),
  nationality: faker.location.country(),
  createdBy: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.future(),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
};
