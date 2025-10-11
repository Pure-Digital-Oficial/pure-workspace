import { CategoryTransactionMock } from '../../../../entities';
import {
  CategoryTransactionResponseDto,
  FindCategoryTransactionByIdRepository,
} from '../../../../../index';

export class FindCategoryTransactionByIdRepositoryMock
  implements FindCategoryTransactionByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CategoryTransactionResponseDto> {
    this.inputMock = id;
    return CategoryTransactionMock;
  }
}
