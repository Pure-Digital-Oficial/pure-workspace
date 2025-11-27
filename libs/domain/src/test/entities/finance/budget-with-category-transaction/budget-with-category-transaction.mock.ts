import { faker } from '@faker-js/faker';
import { BudgetWithCategoryTransactionResponseDto } from '../../../../index';
import { BudgetMock } from '../budget/budget.mock';
import { CategoryTransactionMock } from '../transaction';

export const BudgetWithCategoryTransactionMock: BudgetWithCategoryTransactionResponseDto =
  {
    id: faker.string.uuid(),
    budget: BudgetMock,
    categoryTransaction: CategoryTransactionMock,
  };
