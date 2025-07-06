export interface ShotResponseDto {
  id: string;
  modelId: string;
  createdBy: string;
  title: string;
  scheduled: boolean;
  scheduleDate?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
