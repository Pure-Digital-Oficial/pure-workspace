import { GeneralFrequencyType } from '../../../../types';

export interface FixedGainBodyDto {
  name: string;
  value: number;
  dayOfReceipt: number;
  frequency: GeneralFrequencyType;
  loggedUserId: string;
}
