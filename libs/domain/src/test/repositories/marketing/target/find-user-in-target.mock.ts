import {
  FindUserInTargetDto,
  FindUserInTargetRepository,
} from '../../../../../src';
import { TargetMock } from '../../../entities';

export class FindUserInTargetRepositoryMock
  implements FindUserInTargetRepository
{
  inputMock = {} as FindUserInTargetDto;
  async find(input: FindUserInTargetDto): Promise<string> {
    this.inputMock = input;
    return TargetMock.id;
  }
}
