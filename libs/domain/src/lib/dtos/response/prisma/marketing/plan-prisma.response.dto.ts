import { GeneralFrequencyType, GeneralStatus } from '../../../../types';

export interface PlanPrismaResponseDto {
  id: string;
  title: string;
  description: string;
  amount: number;
  frequency: GeneralFrequencyType;
  status: GeneralStatus;
  created_at: Date;
  updated_at: Date;
  user: {
    nickname: string;
  };
}
