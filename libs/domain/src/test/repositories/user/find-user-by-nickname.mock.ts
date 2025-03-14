import { FindUserByNicknameRepository, UserResponseDto } from '../../../../src';

export class FindUserByNickNameRepositoryMock
  implements FindUserByNicknameRepository
{
  outputMock = {} as UserResponseDto;
  nameMock = '';
  async find(name: string): Promise<UserResponseDto> {
    this.nameMock = name;
    return this.outputMock;
  }
}
