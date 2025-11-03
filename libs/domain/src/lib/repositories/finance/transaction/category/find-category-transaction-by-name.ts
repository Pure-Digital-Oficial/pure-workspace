import {
  BodyCategoryTransactionDto,
  CategoryTransactionResponseDto,
} from '../../../../dtos';

export interface FindCategoryTransactionByNameRepository {
  find(
    input: Pick<BodyCategoryTransactionDto, 'name' | 'loggedUserId'>
  ): Promise<CategoryTransactionResponseDto>;
}
