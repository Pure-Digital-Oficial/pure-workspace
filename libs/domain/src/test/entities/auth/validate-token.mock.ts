import { ValidateTokenResponseDto } from '../../../../src';
import { UserMock } from '../user';
import { AuthMock } from './auth.mock';

export const ValidateTokenMock: ValidateTokenResponseDto = {
  email: AuthMock.email,
  userId: UserMock.id,
};
