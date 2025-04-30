import { EditUserProfileDto, EditUserProfileRepository } from '../../../../src';
import { UserMock } from '../../entities';

export class EditUserProfileRepositoryMock
  implements EditUserProfileRepository
{
  inputMock = {} as EditUserProfileDto;
  async edit(input: EditUserProfileDto): Promise<string> {
    this.inputMock = input;
    return UserMock.id;
  }
}
