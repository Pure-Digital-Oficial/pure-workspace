import { InternalStatus } from '../../../types';

export interface HistoryShotPrismaResponseDto {
  status: InternalStatus;
  error: string | null;
  id: string;
  target_id: string;
  shot_id: string;
  oppened: boolean;
  clicked_in_link: boolean;
  created_at: Date;
  updated_at: Date | null;
  clicked_at: Date | null;
  oppened_at: Date | null;
  shoted_at: Date | null;
}
