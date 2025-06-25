import { faker } from '@faker-js/faker';
import { ListTargetsResponseDto } from '../../../../../src';
import { TargetMock } from './target.mock';

export const ListTargetsMock: ListTargetsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  targets: [TargetMock],
};
