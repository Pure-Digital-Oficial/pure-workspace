import {
  CreateTransactionDto,
  CreateTransactionRepository,
} from '../../../../../../src';
import { TransactionMock } from '../../../../entities';

export class CreateTransactionRepositoryMock
  implements CreateTransactionRepository
{
  inputMock = {} as CreateTransactionDto;
  async create(input: CreateTransactionDto): Promise<string> {
    this.inputMock = input;
    return TransactionMock.id;
  }
}
