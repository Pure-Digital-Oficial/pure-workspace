import { CreateTransactionDto } from '../../../dtos';

export interface CreateTransactionRepository {
  create(input: CreateTransactionDto): Promise<string>;
}
