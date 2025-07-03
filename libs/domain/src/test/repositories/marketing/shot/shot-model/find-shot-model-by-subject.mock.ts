import {
  FindShotModelByEntityDto,
  FindShotModelBySubjectRepository,
  ShotModelResponseDto,
} from '../../../../../../src';

export class FindShotModelBySubjectRepositoryMock
  implements FindShotModelBySubjectRepository
{
  inputMock = {} as FindShotModelByEntityDto;
  outputMock = {} as ShotModelResponseDto;
  async find(input: FindShotModelByEntityDto): Promise<ShotModelResponseDto> {
    this.inputMock = input;
    return this.outputMock;
  }
}
