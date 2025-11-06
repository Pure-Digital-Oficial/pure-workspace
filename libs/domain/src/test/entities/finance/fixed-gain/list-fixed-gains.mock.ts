import { faker } from '@faker-js/faker';
import { ListFixedGainsResponseDto } from '../../../../index';
import { FixedGainMock } from '.';

export const ListFixedGainsMock: ListFixedGainsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  fixedGains: [FixedGainMock],
};
