import { TransactionType } from '../../../../types';

export interface CreateTransactionDto {
  name: string;
  value: number;
  type: TransactionType;
  categoryId: string;
  loggedUserId: string;
  initialDate?: Date;
  finalDate?: Date;
}
