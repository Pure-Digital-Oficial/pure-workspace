import { DeleteBudgetDto } from '../../../dtos';

export interface DeleteBudgetRepository {
  delete(input: DeleteBudgetDto): Promise<string>;
}
