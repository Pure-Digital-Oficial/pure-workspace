import { BudgetResponseDto } from '../../../dtos';

export interface FindBudgetByIdRepository {
  find(id: string): Promise<BudgetResponseDto>;
}
