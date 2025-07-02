import {
  FindShotModelByEntityDto,
  FindShotModelByTitleRepository,
  ShotModelResponseDto,
} from '../../../../../../src';

export class FindShotModelByTitleRepositoryMock
  implements FindShotModelByTitleRepository
{
  inputMock = {} as FindShotModelByEntityDto;
  outputMock = {} as ShotModelResponseDto;
  async find(input: FindShotModelByEntityDto): Promise<ShotModelResponseDto> {
    this.inputMock = input;
    return this.outputMock;
  }
}
