import { TransactionResponseDto } from '../../../../dtos';

export interface FindTransactionByIdRepository {
  find(id: string): Promise<TransactionResponseDto>;
}
