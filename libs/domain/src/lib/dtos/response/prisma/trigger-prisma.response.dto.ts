import { GeneralStatus, TriggerType } from '../../../types';

export interface TriggerPrismaResponseDto {
  status: GeneralStatus;
  id: string;
  name: string;
  content: string;
  description: string;
  type: TriggerType;
  created_at: Date;
  updated_at: Date;
  user: {
    nickname: string;
  };
}
