import { BudgetResponseDto } from '.';

export interface ListBudgetsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  budgets: BudgetResponseDto[];
}
