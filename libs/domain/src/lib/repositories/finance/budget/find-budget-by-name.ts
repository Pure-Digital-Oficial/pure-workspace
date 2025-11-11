import { BudgetResponseDto, FindBudgetByNameDto } from '../../../dtos';

export interface FindBudgetByNameRepository {
  find(input: FindBudgetByNameDto): Promise<BudgetResponseDto>;
}
