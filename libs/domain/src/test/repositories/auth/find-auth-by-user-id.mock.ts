import { FindAuthByUserIdRepository } from '../../../../src';

export class FindAuthByUserIdRepositoryMock
  implements FindAuthByUserIdRepository
{
  inputMock = '';
  async find(id: string): Promise<string> {
    this.inputMock = id;
    return '';
  }
}
