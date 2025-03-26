import { faker } from '@faker-js/faker/.';
import { TokenResponseDto } from '../../..';

export const TokenMock: TokenResponseDto = {
  accessToken: faker.string.uuid(),
  refreshToken: faker.string.uuid(),
};
