export interface HistoryShotResponseDto {
  id: string;
  targetId: string;
  shotId: string;
  oppened: boolean;
  clickedInLink: boolean;
  createdAt: Date;
  updatedAt: Date;
  clickedAt: Date;
  oppenedAt: Date;
  shotedAt: Date;
  status: string;
}
