import { DeleteCategoryTransactionDto } from 'libs/domain/src/lib/dtos';

export interface DeleteCategoryTransactionRepository {
  delete(input: DeleteCategoryTransactionDto): Promise<string>;
}
