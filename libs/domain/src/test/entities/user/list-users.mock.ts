import { faker } from '@faker-js/faker/.';
import { ListUsersResponseDto } from '../../../../src';
import { UserMock } from '.';

export const ListUsersMock: ListUsersResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  users: [UserMock],
};
