import {
  CreateUniqueTargetDto,
  CreateUniqueTargetRepository,
} from '../../../../../src';
import { TargetMock } from '../../../entities';

export class CreateUniqueTargetRepositoryMock
  implements CreateUniqueTargetRepository
{
  inputMock = {} as CreateUniqueTargetDto;
  async create(input: CreateUniqueTargetDto): Promise<string> {
    this.inputMock = input;
    return TargetMock.id;
  }
}
