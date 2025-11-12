import { BudgetBodyDto } from './budget-body.dto';

export interface EditBudgetDto extends BudgetBodyDto {
  id: string;
}
