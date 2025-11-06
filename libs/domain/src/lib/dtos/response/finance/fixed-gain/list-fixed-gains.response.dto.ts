import { FixedGainResponseDto } from '.';

export interface ListFixedGainsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  fixedGains: FixedGainResponseDto[];
}
