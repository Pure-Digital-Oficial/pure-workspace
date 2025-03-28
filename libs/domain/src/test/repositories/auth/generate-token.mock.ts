import { GenerateTokenDto, GenerateTokenRepository } from '../../../../src';
import { TokenMock } from '../../entities';

export class GenerateTokenRepositoryMock implements GenerateTokenRepository {
  inputMock = {} as GenerateTokenDto;
  async generate(input: GenerateTokenDto): Promise<string> {
    this.inputMock = input;
    return TokenMock.accessToken;
  }
}
