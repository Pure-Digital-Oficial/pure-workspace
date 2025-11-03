import {
  ListCategoryTransactionsDto,
  ListCategoryTransactionsResponseDto,
} from '../../../../dtos';

export interface ListCategoryTransactionsRepository {
  list(
    input: ListCategoryTransactionsDto
  ): Promise<ListCategoryTransactionsResponseDto>;
}
