import { faker } from '@faker-js/faker';
import { CategoryTransactionResponseDto } from '../../../../../index';

export const CategoryTransactionMock: CategoryTransactionResponseDto = {
  id: faker.string.uuid(),
  name: faker.commerce.department(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  createdBy: faker.person.fullName(),
  description: faker.commerce.productDescription(),
  status: faker.string.alpha(3),
};
