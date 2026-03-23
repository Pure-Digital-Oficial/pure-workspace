import { BaseEntityResponseDto } from '../../utils';

export interface PlanResponseDto extends BaseEntityResponseDto {
  id: string;
  title: string;
  description: string;
  frequency: string;
  amount: number;
}
