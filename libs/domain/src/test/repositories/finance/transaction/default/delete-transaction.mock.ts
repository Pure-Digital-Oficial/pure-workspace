import {
  DeleteTransactionDto,
  DeleteTransactionRepository,
} from '../../../../../index';
import { TransactionMock } from '../../../../entities';

export class DeleteTransactionRepositoryMock
  implements DeleteTransactionRepository
{
  inputMock = {} as DeleteTransactionDto;
  async delete(input: DeleteTransactionDto): Promise<string> {
    this.inputMock = input;
    return TransactionMock.id;
  }
}
