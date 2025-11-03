import { faker } from '@faker-js/faker';
import { ListCategoryTransactionsResponseDto } from '../../../../../index';
import { CategoryTransactionMock } from '.';

export const ListCategoryTransactionsMock: ListCategoryTransactionsResponseDto =
  {
    filteredTotal: faker.number.int(),
    total: faker.number.int(),
    totalPages: faker.number.int(),
    transactions: [CategoryTransactionMock],
  };
