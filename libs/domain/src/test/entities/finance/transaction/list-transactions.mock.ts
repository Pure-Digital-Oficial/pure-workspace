import { faker } from '@faker-js/faker';
import { ListTransactionsResponseDto } from '../../../../index';
import { TransactionMock } from '.';

export const ListTransactionsMock: ListTransactionsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  transactions: [TransactionMock],
};
