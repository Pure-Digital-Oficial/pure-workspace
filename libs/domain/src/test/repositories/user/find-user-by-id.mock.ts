import { FindUserByIdRepository, UserResponseDto } from '../../../../src';
import { UserMock } from '../../entities';

export class FindUserByIdRepositoryMock implements FindUserByIdRepository {
  inputMock = '';
  async find(id: string): Promise<UserResponseDto> {
    this.inputMock = id;
    return UserMock;
  }
}
