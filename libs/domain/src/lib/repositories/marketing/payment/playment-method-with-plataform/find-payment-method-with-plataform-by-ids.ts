import { PaymentMethodWithPlataformDto } from '../../../../dtos';

export interface FindPaymentMethodWithPlataformByIdsRepository {
  find(input: PaymentMethodWithPlataformDto): Promise<string>;
}
