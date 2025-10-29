import { CategoryTransactionResponseDto } from '.';

export type TransactionResponseItem = Pick<
  CategoryTransactionResponseDto,
  'id' | 'name'
>;
