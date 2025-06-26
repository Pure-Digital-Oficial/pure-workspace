import {
  FindTriggerByContentRepository,
  TriggerResponseDto,
  FindTriggerByEntityDto,
} from '../../../../../src';

export class FindTriggerByContentRepositoryMock
  implements FindTriggerByContentRepository
{
  inputMock = {} as FindTriggerByEntityDto;
  outputMock = {} as TriggerResponseDto;
  async find(input: FindTriggerByEntityDto): Promise<TriggerResponseDto> {
    this.inputMock = input;
    return this.outputMock;
  }
}
