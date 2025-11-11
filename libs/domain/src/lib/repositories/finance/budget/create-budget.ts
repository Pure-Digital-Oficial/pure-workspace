import { CreateBudgetDto } from '../../../dtos';

export interface CreateBudgetRepository {
  create(input: CreateBudgetDto): Promise<string>;
}
