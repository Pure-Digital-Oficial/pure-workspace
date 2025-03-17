import { HashGeneratorRepository } from '../../../../src';
import { HashMock } from '../../entities';

export class HashGeneratorRepositoryMock implements HashGeneratorRepository {
  inputMock = '';
  async hash(key: string): Promise<string> {
    this.inputMock = key;
    return HashMock.token;
  }
}
