import { GeneralStatus, TransactionType } from '../../../../types';

export interface TransactionPrismaResponseDto {
  name: string;
  id: string;
  value: number;
  type: TransactionType;
  status: GeneralStatus;
  initial_date: Date | null;
  final_date: Date | null;
  created_at: Date;
  updated_at: Date;
  user: {
    nickname: string;
  };
  category: {
    name: string;
    id: string;
  };
}
