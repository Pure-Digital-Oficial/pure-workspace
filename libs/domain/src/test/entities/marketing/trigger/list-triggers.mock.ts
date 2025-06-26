import { faker } from '@faker-js/faker';
import { ListTriggersResponseDto } from '../../../../../src';
import { TriggerMock } from './trigger.mock';

export const ListTriggersMock: ListTriggersResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  triggers: [TriggerMock],
};
