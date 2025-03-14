import { AppResponseDto } from '../../dtos';

export interface FindAppByIdRepository {
  find(id: string): Promise<AppResponseDto>;
}
