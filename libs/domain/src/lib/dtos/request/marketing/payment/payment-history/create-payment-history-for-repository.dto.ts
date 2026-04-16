import { PaymentHistoryBaseDto } from './payment-history-base.dto';

export interface CreatePaymentHistoryForRepositoryDto
  extends PaymentHistoryBaseDto {
  customerId: string;
  amount: number;
}
