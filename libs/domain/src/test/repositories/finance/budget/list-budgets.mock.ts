import {
  ListBudgetsDto,
  ListBudgetsRepository,
  ListBudgetsResponseDto,
} from '../../../../index';
import { ListBudgetsMock } from '../../../entities';

export class ListBudgetsRepositoryMock implements ListBudgetsRepository {
  inputMock = {} as ListBudgetsDto;
  async list(input: ListBudgetsDto): Promise<ListBudgetsResponseDto> {
    this.inputMock = input;
    return ListBudgetsMock;
  }
}
