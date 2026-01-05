import { faker } from '@faker-js/faker';
import { TotalTransactionsResponseDto } from '../../../../../index';

export const TotalTransactionsMock: TotalTransactionsResponseDto = {
  title: faker.commerce.productName(),
  total: faker.number.int(),
};
