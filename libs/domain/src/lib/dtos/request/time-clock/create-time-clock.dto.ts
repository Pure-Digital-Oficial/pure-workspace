export interface CreateTimeClockDto {
  user: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  modality: string;
  Features: string;
  description?: string;
  problem?: string;
  doubt?: string;
  Project: string;
  completed: boolean;
}
