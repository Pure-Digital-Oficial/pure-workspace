import { PaymentHistoryResponseDto } from '../../../../dtos';

export interface FindPaymentHistoryByCustomerIdRepository {
  find(customerId: string): Promise<PaymentHistoryResponseDto>;
}
