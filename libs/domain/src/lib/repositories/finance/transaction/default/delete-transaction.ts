import { DeleteTransactionDto } from '../../../../dtos';

export interface DeleteTransactionRepository {
  delete(input: DeleteTransactionDto): Promise<string>;
}
