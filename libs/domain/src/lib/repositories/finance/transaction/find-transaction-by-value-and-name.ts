import {
  FindTransactionByValueAndNameDto,
  TransactionResponseDto,
} from '../../../dtos';

export interface FindTransactionByValueAndNameRepository {
  find(
    input: FindTransactionByValueAndNameDto
  ): Promise<TransactionResponseDto>;
}
