import { FixedGainResponseDto } from '../../../dtos';

export interface FindFixedGainByIdRepository {
  find(id: string): Promise<FixedGainResponseDto>;
}
