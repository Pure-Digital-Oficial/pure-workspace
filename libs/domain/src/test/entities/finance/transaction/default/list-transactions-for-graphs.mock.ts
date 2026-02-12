import { faker } from '@faker-js/faker/.';
import { ListTransactionsForGraphsResponseDto } from '../../../../../index';

export const ListTransactionsForGraphsMock: ListTransactionsForGraphsResponseDto =
  {
    id: faker.string.uuid(),
    name: faker.string.sample(),
    data: [
      {
        category: faker.string.sample(),
        value: faker.number.float(),
      },
    ],
  };
