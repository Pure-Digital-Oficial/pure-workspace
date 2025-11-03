import { EditCategoryTransactionDto } from '../../../../dtos';

export interface EditCategoryTransactionRepository {
  edit(input: EditCategoryTransactionDto): Promise<string>;
}
