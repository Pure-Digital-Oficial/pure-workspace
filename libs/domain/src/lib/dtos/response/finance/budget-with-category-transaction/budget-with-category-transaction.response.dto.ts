import { BudgetResponseDto } from '../budget';
import { CategoryTransactionResponseDto } from '../transaction';

export interface BudgetWithCategoryTransactionResponseDto {
  id: string;
  budget: BudgetResponseDto;
  categoryTransaction: CategoryTransactionResponseDto;
}
