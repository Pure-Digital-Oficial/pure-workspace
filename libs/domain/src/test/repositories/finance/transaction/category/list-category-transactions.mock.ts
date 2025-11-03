import {
  ListCategoryTransactionsDto,
  ListCategoryTransactionsRepository,
  ListCategoryTransactionsResponseDto,
} from '../../../../../index';
import { ListCategoryTransactionsMock } from '../../../../entities';

export class ListCategoryTransactionsRepositoryMock
  implements ListCategoryTransactionsRepository
{
  inputMock = {} as ListCategoryTransactionsDto;
  async list(
    input: ListCategoryTransactionsDto
  ): Promise<ListCategoryTransactionsResponseDto> {
    this.inputMock = input;
    return ListCategoryTransactionsMock;
  }
}
