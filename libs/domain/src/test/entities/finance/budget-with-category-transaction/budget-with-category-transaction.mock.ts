import { faker } from '@faker-js/faker';
import { BudgetWithCategoryTransactionResponseDto } from '../../../../index';

export const BudgetWithCategoryTransactionMock: BudgetWithCategoryTransactionResponseDto =
  {
    id: faker.string.uuid(),
  };
