import {
  EditTransactionDto,
  EditTransactionRepository,
} from '../../../../index';
import { TransactionMock } from '../../../entities';

export class EditTransactionRepositoryMock
  implements EditTransactionRepository
{
  inputMock = {} as EditTransactionDto;
  async edit(input: EditTransactionDto): Promise<string> {
    this.inputMock = input;
    return TransactionMock.id;
  }
}
