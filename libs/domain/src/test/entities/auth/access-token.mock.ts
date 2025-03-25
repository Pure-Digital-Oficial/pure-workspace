import { faker } from '@faker-js/faker/.';
import { TokenResponseDto } from '../../../../src';

export const AccessTokenMock: TokenResponseDto = {
  token: faker.string.uuid(),
};
