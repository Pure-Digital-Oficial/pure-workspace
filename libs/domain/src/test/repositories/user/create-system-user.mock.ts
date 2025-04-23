import {
  CreateSystemUserDto,
  CreateSystemUserRepository,
} from '../../../../src';
import { UserMock } from '../../entities';

export class CreateSystemUserRepositoryMock
  implements CreateSystemUserRepository
{
  inputMock = {} as CreateSystemUserDto;
  async create(input: CreateSystemUserDto): Promise<string> {
    this.inputMock = input;
    return UserMock.id;
  }
}
