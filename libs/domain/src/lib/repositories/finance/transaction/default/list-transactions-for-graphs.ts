import {
  ListTransactionsForGraphsDto,
  ListTransactionsForGraphsResponseDto,
} from '../../../../dtos';

export interface ListTransactionsForGraphsRepository {
  list(
    input: ListTransactionsForGraphsDto
  ): Promise<ListTransactionsForGraphsResponseDto>;
}
