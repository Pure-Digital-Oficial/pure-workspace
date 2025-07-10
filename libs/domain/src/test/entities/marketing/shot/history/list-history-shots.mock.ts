import { faker } from '@faker-js/faker';
import { ListHistoryShotsResponseDto } from '../../../../../../src';
import { HistoryShotMock } from './history-shot.mock';

export const ListHistoryShotsMock: ListHistoryShotsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  historical: [HistoryShotMock],
};
