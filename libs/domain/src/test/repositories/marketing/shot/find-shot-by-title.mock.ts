import {
  FindShotByEntityDto,
  FindShotByTitleRepository,
  ShotResponseDto,
} from '../../../../../src';

export class FindShotByTitleRepositoryMock
  implements FindShotByTitleRepository
{
  inputMock = {} as FindShotByEntityDto;
  outputMock = {} as ShotResponseDto;
  async find(input: FindShotByEntityDto): Promise<ShotResponseDto> {
    this.inputMock = input;
    return this.outputMock;
  }
}
