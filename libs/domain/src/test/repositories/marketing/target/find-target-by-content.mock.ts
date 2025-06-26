import {
  FindTargetByContentRepository,
  TargetResponseDto,
  FindTargetByEntityDto,
} from '../../../../../src';

export class FindTargetByContentRepositoryMock
  implements FindTargetByContentRepository
{
  inputMock = {} as FindTargetByEntityDto;
  async find(input: FindTargetByEntityDto): Promise<TargetResponseDto> {
    this.inputMock = input;
    return {} as TargetResponseDto;
  }
}
