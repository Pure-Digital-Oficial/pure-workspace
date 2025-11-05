import {
  CategoryTransactionBodyDto,
  CategoryTransactionResponseDto,
  FindCategoryTransactionByNameRepository,
} from '../../../../../index';

export class FindCategoryTransactionByNameRepositoryMock
  implements FindCategoryTransactionByNameRepository
{
  inputMock = {} as Pick<CategoryTransactionBodyDto, 'name' | 'loggedUserId'>;
  async find(
    input: Pick<CategoryTransactionBodyDto, 'name' | 'loggedUserId'>
  ): Promise<CategoryTransactionResponseDto> {
    this.inputMock = input;
    return {} as CategoryTransactionResponseDto;
  }
}
