import {
  FindTriggerByIdRepository,
  TriggerResponseDto,
} from '../../../../../src';
import { TriggerMock } from '../../../entities';

export class FindTriggerByIdRepositoryMock
  implements FindTriggerByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<TriggerResponseDto> {
    this.inputMock = id;
    return TriggerMock;
  }
}
