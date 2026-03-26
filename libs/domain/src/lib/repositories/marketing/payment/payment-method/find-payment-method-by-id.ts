import { PaymentMethodResponseDto } from '../../../../dtos';

export interface FindPaymentMethodByIdRepository {
  find(id: string): Promise<PaymentMethodResponseDto>;
}
