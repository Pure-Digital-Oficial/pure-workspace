import { faker } from '@faker-js/faker';
import { AppResponseDto } from '../../../../src';

export const AppMock: AppResponseDto = {
  id: faker.string.uuid(),
  name: faker.internet.displayName(),
};
