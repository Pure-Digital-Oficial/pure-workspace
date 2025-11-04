import {
  CategoryTransactionBodyDto,
  CategoryTransactionResponseDto,
} from '../../../../dtos';

export interface FindCategoryTransactionByNameRepository {
  find(
    input: Pick<CategoryTransactionBodyDto, 'name' | 'loggedUserId'>
  ): Promise<CategoryTransactionResponseDto>;
}
