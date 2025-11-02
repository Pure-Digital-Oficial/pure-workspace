import {
  CreateCategoryTransactionDto,
  CreateCategoryTransactionRepository,
} from '../../../../../index';
import { CategoryTransactionMock } from '../../../../entities';

export class CreateCategoryTransactionRepositoryMock
  implements CreateCategoryTransactionRepository
{
  inputMock = {} as CreateCategoryTransactionDto;
  async create(input: CreateCategoryTransactionDto): Promise<string> {
    this.inputMock = input;
    return CategoryTransactionMock.id;
  }
}
