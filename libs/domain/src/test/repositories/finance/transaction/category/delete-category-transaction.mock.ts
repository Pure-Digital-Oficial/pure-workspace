import {
  DeleteCategoryTransactionDto,
  DeleteCategoryTransactionRepository,
} from '../../../../../index';
import { CategoryTransactionMock } from '../../../../entities';

export class DeleteCategoryTransactionRepositoryMock
  implements DeleteCategoryTransactionRepository
{
  inputMock = {} as DeleteCategoryTransactionDto;
  async delete(input: DeleteCategoryTransactionDto): Promise<string> {
    this.inputMock = input;
    return CategoryTransactionMock.id;
  }
}
