import { DeleteBudgetDto, DeleteBudgetRepository } from '../../../../index';
import { BudgetMock } from '../../../entities';

export class DeleteBudgetRepositoryMock implements DeleteBudgetRepository {
  inputMock = {} as DeleteBudgetDto;
  async delete(input: DeleteBudgetDto): Promise<string> {
    this.inputMock = input;
    return BudgetMock.id;
  }
}
