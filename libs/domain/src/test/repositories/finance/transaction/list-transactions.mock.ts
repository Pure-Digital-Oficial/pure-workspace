import {
  ListTransactionsDto,
  ListTransactionsRepository,
  ListTransactionsResponseDto,
} from '../../../../index';
import { ListTransactionsMock } from '../../../entities';

export class ListTransactionsRepositoryMock
  implements ListTransactionsRepository
{
  inputMock = {} as ListTransactionsDto;
  async list(input: ListTransactionsDto): Promise<ListTransactionsResponseDto> {
    this.inputMock = input;
    return ListTransactionsMock;
  }
}
