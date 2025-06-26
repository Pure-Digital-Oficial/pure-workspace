import {
  FindTriggerByEntityDto,
  FindTriggerByNameRepository,
  TriggerResponseDto,
} from '../../../../../src';

export class FindTriggerByNameRepositoryMock
  implements FindTriggerByNameRepository
{
  inputMock = {} as FindTriggerByEntityDto;
  outputMock = {} as TriggerResponseDto;
  async find(input: FindTriggerByEntityDto): Promise<TriggerResponseDto> {
    this.inputMock = input;
    return this.outputMock;
  }
}
