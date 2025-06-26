import {
  FindUserInTargetDto,
  FindUserInTargetRepository,
  TargetResponseDto,
} from '../../../../../src';
import { TargetMock } from '../../../entities';

export class FindUserInTargetRepositoryMock
  implements FindUserInTargetRepository
{
  inputMock = {} as FindUserInTargetDto;
  async find(input: FindUserInTargetDto): Promise<TargetResponseDto> {
    this.inputMock = input;
    return TargetMock;
  }
}
