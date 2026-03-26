import { BaseEntityResponseDto } from '../../../utils';

export interface PaymentHistoryResponseDto extends BaseEntityResponseDto {
  id: string;
  customerId: string;
  amount: number;
  planId: string;
  externalId: number;
  characterId: string;
}
