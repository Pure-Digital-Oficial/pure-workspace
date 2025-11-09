import { CreateBudgetRepository, CreateBudgetDto } from '../../../../index';
import { BudgetMock } from '../../../entities';

export class CreateBudgetRepositoryMock implements CreateBudgetRepository {
  inputMock = {} as CreateBudgetDto;
  async create(input: CreateBudgetDto): Promise<string> {
    this.inputMock = input;
    return BudgetMock.id;
  }
}
