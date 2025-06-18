import {
  FindTriggerByNameRepository,
  TriggerResponseDto,
} from '../../../../../src';

export class FindTriggerByNameRepositoryMock
  implements FindTriggerByNameRepository
{
  inputMock = '';
  outputMock = {} as TriggerResponseDto;
  async find(name: string): Promise<TriggerResponseDto> {
    this.inputMock = name;
    return this.outputMock;
  }
}
