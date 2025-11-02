import {
  BodyCategoryTransactionDto,
  CategoryTransactionResponseDto,
  FindCategoryTransactionByNameRepository,
} from '../../../../../index';

export class FindCategoryTransactionByNameRepositoryMock
  implements FindCategoryTransactionByNameRepository
{
  inputMock = {} as Pick<BodyCategoryTransactionDto, 'name' | 'loggedUserId'>;
  async find(
    input: Pick<BodyCategoryTransactionDto, 'name' | 'loggedUserId'>
  ): Promise<CategoryTransactionResponseDto> {
    this.inputMock = input;
    return {} as CategoryTransactionResponseDto;
  }
}
