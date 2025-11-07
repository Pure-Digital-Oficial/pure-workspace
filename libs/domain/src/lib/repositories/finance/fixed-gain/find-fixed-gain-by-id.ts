import { FixedGainResponseDto } from '../../../dtos';

export interface FindFixedGaindByIdRepository {
  find(id: string): Promise<FixedGainResponseDto>;
}
