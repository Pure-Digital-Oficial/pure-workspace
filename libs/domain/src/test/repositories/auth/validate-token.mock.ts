import {
  ValidateTokenRepository,
  ValidateTokenDto,
  ValidateTokenResponseDto,
} from '../../../../src';
import { AuthMock, UserMock } from '../../entities';

export class ValidateTokenRepositoryMock implements ValidateTokenRepository {
  inputToken = {} as ValidateTokenDto;
  async validate(input: ValidateTokenDto): Promise<ValidateTokenResponseDto> {
    this.inputToken = input;
    return {
      userId: UserMock.id,
      email: AuthMock.email,
    };
  }
}
