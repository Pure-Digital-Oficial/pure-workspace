import { FindUserByEmailRepository, UserResponseDto } from '../../../../src';

export class FindUserByEmailRepositoryMock
  implements FindUserByEmailRepository
{
  inputMock = '';
  async find(email: string): Promise<UserResponseDto> {
    this.inputMock = email;
    return {} as UserResponseDto;
  }
}
