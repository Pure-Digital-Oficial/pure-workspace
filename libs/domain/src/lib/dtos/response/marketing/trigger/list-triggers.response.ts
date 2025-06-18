import { TriggerResponseDto } from '../../marketing';

export interface ListTriggersResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  triggers: TriggerResponseDto[];
}
