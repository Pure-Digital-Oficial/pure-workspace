import { faker } from '@faker-js/faker/.';
import { AccessTokenResponseDto } from '../../../../src';

export const AccessTokenMock: AccessTokenResponseDto = {
  token: faker.string.uuid(),
};
