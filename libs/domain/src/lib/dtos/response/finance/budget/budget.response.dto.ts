export interface BudgetResponseDto {
  id: string;
  name: string;
  description: string;
  status: string;
  createdBy: string;
  limitValue: number;
  createdAt: Date;
  updatedAt: Date;
}
