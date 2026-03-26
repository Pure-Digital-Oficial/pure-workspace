import { faker } from '@faker-js/faker';
import { PaymentMethodResponseDto } from '../../../../../index';

export const PaymentMethodMock: PaymentMethodResponseDto = {
  id: faker.string.uuid(),
  title: faker.person.fullName(),
  description: faker.person.fullName(),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  createdBy: faker.string.uuid(),
  value: faker.string.alpha(3),
};
