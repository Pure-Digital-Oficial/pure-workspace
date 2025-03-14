import { CreateUserDto, CreateUserRepository } from '../../../../src';
import { UserMock } from '../../entities';

export class CreateUserRepositoryMock implements CreateUserRepository {
  inputMock = {} as CreateUserDto;
  async create(input: CreateUserDto): Promise<string> {
    this.inputMock = input;
    return UserMock.id;
  }
}
