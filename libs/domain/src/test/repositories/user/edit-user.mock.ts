import { EditUserDto, EditUserRepository } from '../../../../src';
import { UserMock } from '../../entities';

export class EditUserRepositoryMock implements EditUserRepository {
  inputMock = {} as EditUserDto;
  async edit(input: EditUserDto): Promise<string> {
    this.inputMock = input;
    return UserMock.id;
  }
}
