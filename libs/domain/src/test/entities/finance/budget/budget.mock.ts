import { faker } from '@faker-js/faker';
import { BudgetResponseDto } from '../../../../index';

export const BudgetMock: BudgetResponseDto = {
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  status: 'ACTIVE',
  createdBy: {
    id: faker.string.uuid(),
    nickname: faker.commerce.department(),
    picture: faker.commerce.department(),
  },
  limitValue: faker.number.float(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
