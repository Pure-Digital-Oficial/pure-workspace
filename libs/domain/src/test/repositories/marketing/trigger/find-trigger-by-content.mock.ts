import {
  FindTriggerByContentRepository,
  TriggerResponseDto,
} from '../../../../../src';

export class FindTriggerByContentRepositoryMock
  implements FindTriggerByContentRepository
{
  inputMock = '';
  outputMock = {} as TriggerResponseDto;
  async find(content: string): Promise<TriggerResponseDto> {
    this.inputMock = content;
    return this.outputMock;
  }
}
