import { ValidateTokenRepository } from '../../../../src';
import { UserMock } from '../../entities';

export class ValidateTokenRepositoryMock implements ValidateTokenRepository {
  inputToken = '';
  async validate(token: string): Promise<string> {
    this.inputToken = token;
    return UserMock.id;
  }
}
