import {
  FindFixedGainByNameAndValueDto,
  FixedGainResponseDto,
} from '../../../dtos';

export interface FindFixedGainByNameAndValueRepository {
  find(input: FindFixedGainByNameAndValueDto): Promise<FixedGainResponseDto>;
}
