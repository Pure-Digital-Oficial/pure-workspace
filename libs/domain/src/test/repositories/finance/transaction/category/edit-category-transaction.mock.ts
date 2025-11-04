import { CategoryTransactionMock } from '../../../../entities';
import {
  EditCategoryTransactionDto,
  EditCategoryTransactionRepository,
} from '../../../../../index';

export class EditCategoryTransactionRepositoryMock
  implements EditCategoryTransactionRepository
{
  inputMock = {} as EditCategoryTransactionDto;
  async edit(input: EditCategoryTransactionDto): Promise<string> {
    this.inputMock = input;
    return CategoryTransactionMock.id;
  }
}
