import { ListBudgetsDto, ListBudgetsResponseDto } from '../../../dtos';

export interface ListBudgetsRepository {
  list(input: ListBudgetsDto): Promise<ListBudgetsResponseDto>;
}
