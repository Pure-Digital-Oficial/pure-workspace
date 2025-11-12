import { BudgetResponseDto, FindBudgetByIdRepository } from '../../../../index';
import { BudgetMock } from '../../../entities';

export class FindBudgetByIdRepositoryMock implements FindBudgetByIdRepository {
  inputMock = '';
  async find(id: string): Promise<BudgetResponseDto> {
    this.inputMock = id;
    return BudgetMock;
  }
}
