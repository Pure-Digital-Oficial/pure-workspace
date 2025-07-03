import { faker } from '@faker-js/faker';
import { ListShotModelsResponseDto } from '../../../../../../src';
import { ShotModelMock } from './shot-model.mock';

export const ListShotModelsMock: ListShotModelsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  models: [ShotModelMock],
};
