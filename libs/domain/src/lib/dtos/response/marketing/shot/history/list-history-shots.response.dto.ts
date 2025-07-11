import { HistoryShotResponseDto } from './history-shot.response.dto';

export interface ListHistoryShotsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  historical: HistoryShotResponseDto[];
}
