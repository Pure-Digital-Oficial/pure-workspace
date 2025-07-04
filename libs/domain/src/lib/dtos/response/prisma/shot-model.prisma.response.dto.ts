import { GeneralStatus } from '../../../types';

export interface ShotModelPrismaResponseDto {
  title: string;
  subject: string;
  status: GeneralStatus;
  id: string;
  body: string;
  image: string;
  created_at: Date;
  updated_at: Date | null;
  user: {
    nickname: string;
  };
}
