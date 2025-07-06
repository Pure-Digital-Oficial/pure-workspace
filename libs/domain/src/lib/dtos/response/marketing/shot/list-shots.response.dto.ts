import { ShotResponseDto } from './shot.response.dto';

export interface ListShotsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  shots: ShotResponseDto[];
}
