import { EditBudgetDto, EditBudgetRepository } from '../../../../index';
import { BudgetMock } from '../../../entities';

export class EditBudgetRepositoryMock implements EditBudgetRepository {
  inputMock = {} as EditBudgetDto;
  async edit(input: EditBudgetDto): Promise<string> {
    this.inputMock = input;
    return BudgetMock.id;
  }
}
