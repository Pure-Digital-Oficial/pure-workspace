import {
  ValidateTokenRepository,
  ValidateTokenRepositoryDto,
} from '../../../../src';
import { UserMock } from '../../entities';

export class ValidateTokenRepositoryMock implements ValidateTokenRepository {
  inputToken = {} as ValidateTokenRepositoryDto;
  async validate(input: ValidateTokenRepositoryDto): Promise<string> {
    this.inputToken = input;
    return UserMock.id;
  }
}
