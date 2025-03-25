import {
  TokenResponseDto,
  GenerateTokenRepository,
  GenerateTokenDto,
} from '../../../../src';
import { AccessTokenMock } from '../../entities';

export class SignIdRepositoryMock implements GenerateTokenRepository {
  inputMock = {} as GenerateTokenDto;
  async sign(input: GenerateTokenDto): Promise<TokenResponseDto> {
    this.inputMock = input;
    return AccessTokenMock;
  }
}
