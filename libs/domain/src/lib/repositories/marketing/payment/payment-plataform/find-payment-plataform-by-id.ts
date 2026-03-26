import { PaymentPlataformResponseDto } from '../../../../dtos';

export interface FindPaymentPlataformByIdRepository {
  find(id: string): Promise<PaymentPlataformResponseDto>;
}
