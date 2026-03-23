import { BaseListEntitiesResponseDto } from '../../utils';
import { PaymentMethodResponseDto } from './payment-method.response.dto';

export interface ListPaymentMethodsResponseDto
  extends BaseListEntitiesResponseDto {
  paymentMethods: PaymentMethodResponseDto[];
}
