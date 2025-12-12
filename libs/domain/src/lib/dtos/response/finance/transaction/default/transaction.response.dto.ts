import { CreatedByResponseDto } from '../../../user';
import { TransactionResponseItem } from '../category';

export interface TransactionResponseDto {
  id: string;
  category: TransactionResponseItem;
  name: string;
  type: string;
  status: string;
  value: number;
  createdBy: CreatedByResponseDto;
  createdAt: Date;
  updatedAt: Date;
  initialDate?: Date;
  finalDate?: Date;
}
