import { EditBudgetDto } from '../../../dtos';

export interface EditBudgetRepository {
  edit(input: EditBudgetDto): Promise<string>;
}
