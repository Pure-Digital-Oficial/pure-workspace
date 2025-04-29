import { ChangeUserTypeDto, ChangeUserTypeRepository } from '../../../../src';
import { UserMock } from '../../entities';

export class ChangeUserTypeRepositoryMock implements ChangeUserTypeRepository {
  inputMock = {} as ChangeUserTypeDto;
  async change(input: ChangeUserTypeDto): Promise<string> {
    this.inputMock = input;
    return UserMock.id;
  }
}
