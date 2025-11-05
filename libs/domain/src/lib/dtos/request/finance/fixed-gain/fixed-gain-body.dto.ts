import { FixedGainType } from '../../../../types';

export interface FixedGainBodyDto {
  name: string;
  value: number;
  dayOfReceipt: number;
  frequency: FixedGainType;
  loggedUserId: string;
}
