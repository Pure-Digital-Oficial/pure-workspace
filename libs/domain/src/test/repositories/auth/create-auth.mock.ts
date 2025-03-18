import { CreateAuthDto, CreateAuthRepository } from '../../../../src';
import { AuthMock } from '../../entities';

export class CreateAuthRepositoryMock implements CreateAuthRepository {
  inputMock = {} as CreateAuthDto;
  async create(input: CreateAuthDto): Promise<string> {
    this.inputMock = input;
    return AuthMock.id;
  }
}
