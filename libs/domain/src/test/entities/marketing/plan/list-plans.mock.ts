import { faker } from '@faker-js/faker';
import { ListPlansResponseDto } from '../../../../index';
import { PlanMock } from './plan.mock';

export const ListPlansMock: ListPlansResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  plans: [PlanMock],
};
