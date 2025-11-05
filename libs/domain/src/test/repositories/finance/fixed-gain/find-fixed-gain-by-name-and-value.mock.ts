import {
  FindFixedGainByNameAndValueDto,
  FindFixedGainByNameAndValueRepository,
  FixedGainResponseDto,
} from '../../../../index';

export class FindFixedGainByNameAndValueRepositoryMock
  implements FindFixedGainByNameAndValueRepository
{
  inputMock = {} as FindFixedGainByNameAndValueDto;
  async find(
    input: FindFixedGainByNameAndValueDto
  ): Promise<FixedGainResponseDto> {
    this.inputMock = input;
    return {} as FixedGainResponseDto;
  }
}
