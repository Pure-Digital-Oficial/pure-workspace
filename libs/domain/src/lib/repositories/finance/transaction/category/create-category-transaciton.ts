import { CreateCategoryTransactionDto } from '../../../../dtos';

export interface CreateCategoryTransactionRepository {
  create(input: CreateCategoryTransactionDto): Promise<string>;
}
