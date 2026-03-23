import { GeneralFrequencyType, GeneralStatus } from '../../../../types';

export interface FixedGainPrismaResponseDto {
  id: string;
  name: string;
  value: number;
  status: GeneralStatus;
  day_of_receipt: number;
  frequency: GeneralFrequencyType;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    nickname: string;
    picture: string | null;
  };
}
