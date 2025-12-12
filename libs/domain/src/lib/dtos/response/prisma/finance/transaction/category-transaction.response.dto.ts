import { GeneralStatus } from '../../../../../types';

export interface CategoryTransactionPrismaResponseDto {
  id: string;
  name: string;
  description: string;
  status: GeneralStatus;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    nickname: string;
    picture: string | null;
  };
}
