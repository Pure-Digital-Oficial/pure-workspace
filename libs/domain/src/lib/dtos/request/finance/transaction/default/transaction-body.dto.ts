import { TransactionType } from '../../../../../types';

export interface TransactionBodyDto {
  name: string;
  value: number;
  type: TransactionType;
  categoryId: string;
  loggedUserId: string;
  initialDate?: Date;
  finalDate?: Date;
}
