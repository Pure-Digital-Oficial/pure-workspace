import { EditTransactionDto } from '../../../dtos';

export interface EditTransactionRepository {
  edit(input: EditTransactionDto): Promise<string>;
}
