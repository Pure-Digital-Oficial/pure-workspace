import { TargetResponseDto } from '../../marketing';

export interface ListTargetsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  triggers: TargetResponseDto[];
}
