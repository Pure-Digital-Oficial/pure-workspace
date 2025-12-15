import { GeneralStatus } from '../../../../types';

export interface BudgetPrismaResponseDto {
  id: string;
  name: string;
  description: string;
  status: GeneralStatus;
  limit_value: number;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    nickname: string;
    picture: string | null;
  };
}
