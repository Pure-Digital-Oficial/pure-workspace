import { PaymentHistoryResponseDto } from '../../../../dtos';

export interface FindPaymentHistoryByExternalIdRepository {
  find(id: number): Promise<PaymentHistoryResponseDto>;
}
