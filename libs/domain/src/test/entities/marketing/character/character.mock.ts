import { faker } from '@faker-js/faker';
import { CharacterResponseDto } from '../../../../index';

export const CharacterMock: CharacterResponseDto = {
  id: faker.string.uuid(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
  createdBy: faker.string.uuid(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.future(),
};
