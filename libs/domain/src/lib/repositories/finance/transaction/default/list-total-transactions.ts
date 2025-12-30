import {
  ListTotalTransactionsDto,
  TotalTransactionsResponseDto,
} from '../../../../dtos';

export interface ListTotalTransactionsRepository {
  list(
    input: ListTotalTransactionsDto
  ): Promise<TotalTransactionsResponseDto[]>;
}
