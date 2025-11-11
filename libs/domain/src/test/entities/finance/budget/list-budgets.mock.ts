import { faker } from '@faker-js/faker';
import { ListBudgetsResponseDto } from '../../../../index';
import { BudgetMock } from '.';

export const ListBudgetsMock: ListBudgetsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  budgets: [BudgetMock],
};
