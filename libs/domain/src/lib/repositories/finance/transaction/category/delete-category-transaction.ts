import { DeleteCategoryTransactionDto } from '../../../../dtos';

export interface DeleteCategoryTransactionRepository {
  delete(input: DeleteCategoryTransactionDto): Promise<string>;
}
