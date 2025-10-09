import {
  FindTransactionByNameAndValueDto,
  TransactionResponseDto,
} from '../../../dtos';

export interface FindTransactionByNameAndValueRepository {
  find(
    input: FindTransactionByNameAndValueDto
  ): Promise<TransactionResponseDto>;
}
