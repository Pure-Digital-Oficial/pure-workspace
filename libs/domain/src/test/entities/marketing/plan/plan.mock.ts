import { faker } from '@faker-js/faker';
import { PlanResponseDto } from '../../../../index';

export const PlanMock: PlanResponseDto = {
  id: faker.string.uuid(),
  amount: faker.number.int(),
  title: faker.person.fullName(),
  description: faker.person.fullName(),
  frequency: faker.person.fullName(),
  createdBy: faker.string.uuid(),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};
