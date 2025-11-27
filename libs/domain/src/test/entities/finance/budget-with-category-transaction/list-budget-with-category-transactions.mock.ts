import { faker } from '@faker-js/faker';
import { ListBudgetWithCategoryTransactionsResponseDto } from '../../../../index';
import { BudgetWithCategoryTransactionMock } from './budget-with-category-transaction.mock';

export const ListBudgetWithCategoryTransactionsMock: ListBudgetWithCategoryTransactionsResponseDto =
  {
    filteredTotal: faker.number.int(),
    total: faker.number.int(),
    totalPages: faker.number.int(),
    items: [BudgetWithCategoryTransactionMock],
  };
