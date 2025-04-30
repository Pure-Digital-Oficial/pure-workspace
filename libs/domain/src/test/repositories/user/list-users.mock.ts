import {
  ListUsersDto,
  ListUsersRepository,
  ListUsersResponseDto,
} from '../../../../src';
import { ListUsersMock } from '../../entities';

export class ListUsersRepositoryMock implements ListUsersRepository {
  inputMock = {} as ListUsersDto;
  async list(input: ListUsersDto): Promise<ListUsersResponseDto> {
    this.inputMock = input;
    return ListUsersMock;
  }
}
