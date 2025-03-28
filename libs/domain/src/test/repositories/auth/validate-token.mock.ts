import { ValidateTokenRepository, ValidateTokenDto } from '../../../../src';
import { UserMock } from '../../entities';

export class ValidateTokenRepositoryMock implements ValidateTokenRepository {
  inputToken = {} as ValidateTokenDto;
  async validate(input: ValidateTokenDto): Promise<string> {
    this.inputToken = input;
    return UserMock.id;
  }
}
