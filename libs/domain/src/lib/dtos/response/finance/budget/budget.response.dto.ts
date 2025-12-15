import { CreatedByResponseDto } from '../../user';

export interface BudgetResponseDto {
  id: string;
  name: string;
  description: string;
  status: string;
  createdBy: CreatedByResponseDto;
  limitValue: number;
  createdAt: Date;
  updatedAt: Date;
}
