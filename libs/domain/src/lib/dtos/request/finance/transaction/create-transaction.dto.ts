import { GeneralStatus, TransactionType } from '../../../../types';

export interface CreateTransactionDto {
  name: string;
  value: number;
  status: GeneralStatus;
  type: TransactionType;
  categoryId: string;
  loggedUserId: string;
  initialDate?: Date;
  finalDate?: Date;
}
