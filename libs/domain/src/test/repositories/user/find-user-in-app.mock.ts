import { FindUserInAppDto, FindUserInAppRepository } from '../../../../src';
import { AppMock, UserMock } from '../../entities';

export class FindUserInAppRepositoryMock implements FindUserInAppRepository {
  inputMock = {} as FindUserInAppDto;
  async find(input: FindUserInAppDto): Promise<string> {
    this.inputMock = input;
    return `${AppMock.id}${UserMock.id}`;
  }
}
