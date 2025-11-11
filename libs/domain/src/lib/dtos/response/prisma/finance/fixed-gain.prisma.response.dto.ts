import { FixedGainType, GeneralStatus } from '../../../../types';

export interface FixedGainPrismaResponseDto {
  id: string;
  name: string;
  value: number;
  status: GeneralStatus;
  day_of_receipt: number;
  frequency: FixedGainType;
  created_at: Date;
  updated_at: Date;
  user: {
    nickname: string;
  };
}
