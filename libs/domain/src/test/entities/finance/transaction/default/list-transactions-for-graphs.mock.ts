import { faker } from '@faker-js/faker/.';
import { ListTransactionsForGraphsResponseDto } from '../../../../../index';

export const ListTransactionsForGraphsMock: ListTransactionsForGraphsResponseDto =
  {
    id: faker.string.uuid(),
    category: faker.string.uuid(),
    value: faker.number.float({ min: 0, max: 1000 }),
  };
