import { faker } from '@faker-js/faker';
import { ListShotsResponseDto } from '../../../../../src';
import { ShotMock } from './shot.mock';

export const ListShotsMock: ListShotsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  shots: [ShotMock],
};
