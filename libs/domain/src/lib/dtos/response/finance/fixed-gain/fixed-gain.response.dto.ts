import { CreatedByResponseDto } from '../../user';

export interface FixedGainResponseDto {
  id: string;
  name: string;
  value: number;
  status: string;
  dayOfReceipt: number;
  frequency: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: CreatedByResponseDto;
}
