import {
  ListTransactionsDto,
  ListTransactionsResponseDto,
} from '../../../dtos';

export interface ListTransactionsRepository {
  list(input: ListTransactionsDto): Promise<ListTransactionsResponseDto>;
}
