import { GeneralStatus } from '../../../types';

export interface TargetPrismaResponseDto {
  content: string;
  status: GeneralStatus;
  id: string;
  trigger_id: string;
  created_at: Date;
  updated_at: Date | null;
  user: {
    nickname: string;
  };
}
