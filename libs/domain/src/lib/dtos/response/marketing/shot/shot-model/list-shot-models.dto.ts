import { ShotModelResponseDto } from '../../shot';

export interface ListShotModelsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  models: ShotModelResponseDto[];
}
