import { GeneralStatus } from '../../../types';

export interface ShotPrismaResponseDto {
  id: string;
  status: GeneralStatus;
  title: string;
  model_id: string;
  schedule_date: Date | null;
  scheduled: boolean;
  created_at: Date;
  updated_at: Date | null;
  user: {
    nickname: string;
  };
}
