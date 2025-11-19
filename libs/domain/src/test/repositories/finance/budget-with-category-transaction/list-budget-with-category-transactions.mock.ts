import {
  ListBudgetWithCategoryTransactionsDto,
  ListBudgetWithCategoryTransactionsRepository,
  ListBudgetWithCategoryTransactionsResponseDto,
} from '../../../../index';
import { ListBudgetWithCategoryTransactionsMock } from '../../../entities';

export class ListBudgetWithCategoryTransactionsRepositoryMock
  implements ListBudgetWithCategoryTransactionsRepository
{
  inputMock = {} as ListBudgetWithCategoryTransactionsDto;
  async list(
    input: ListBudgetWithCategoryTransactionsDto
  ): Promise<ListBudgetWithCategoryTransactionsResponseDto> {
    this.inputMock = input;
    return ListBudgetWithCategoryTransactionsMock;
  }
}
