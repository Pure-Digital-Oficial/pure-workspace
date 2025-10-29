import {
  FindTransactionByIdRepository,
  TransactionResponseDto,
} from '../../../../index';
import { TransactionMock } from '../../../entities';

export class FindTransactionByIdRepositoryMock
  implements FindTransactionByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<TransactionResponseDto> {
    this.inputMock = id;
    return TransactionMock;
  }
}
