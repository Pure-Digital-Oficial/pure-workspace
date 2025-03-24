import {
  AccessTokenResponseDto,
  SignInRepository,
  SignInDto,
} from '../../../../src';
import { AccessTokenMock } from '../../entities';

export class SignIdRepositoryMock implements SignInRepository {
  inputMock = {} as SignInDto;
  async sign(input: SignInDto): Promise<AccessTokenResponseDto> {
    this.inputMock = input;
    return AccessTokenMock;
  }
}
