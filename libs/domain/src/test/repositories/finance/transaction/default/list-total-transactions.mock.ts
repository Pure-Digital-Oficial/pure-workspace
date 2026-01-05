import { TotalTransactionsMock } from '../../../../entities';
import {
  ListTotalTransactionsDto,
  ListTotalTransactionsRepository,
  TotalTransactionsResponseDto,
} from '../../../../../index';

export class ListTotalTransactionsRepositoryMock
  implements ListTotalTransactionsRepository
{
  inputMock = {} as ListTotalTransactionsDto;
  async list(
    input: ListTotalTransactionsDto
  ): Promise<TotalTransactionsResponseDto[]> {
    this.inputMock = input;
    return [TotalTransactionsMock];
  }
}
