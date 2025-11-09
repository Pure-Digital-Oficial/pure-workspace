import {
  BudgetResponseDto,
  FindBudgetByNameDto,
  FindBudgetByNameRepository,
} from '../../../../index';

export class FindBudgetByNameRepositoryMock
  implements FindBudgetByNameRepository
{
  inputMock = {} as FindBudgetByNameDto;
  async find(input: FindBudgetByNameDto): Promise<BudgetResponseDto> {
    this.inputMock = input;
    return {} as BudgetResponseDto;
  }
}
