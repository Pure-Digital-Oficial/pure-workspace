import { ShotModelResponseDto } from '../../../../dtos';

export interface FindShotModelByIdRepository {
  find(id: string): Promise<ShotModelResponseDto>;
}
