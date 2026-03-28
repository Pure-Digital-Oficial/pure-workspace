import { BaseEntityInputDto } from '../../utils';

export interface ConfirmManualPaymentDto extends BaseEntityInputDto {
  customerId: string;
  paymentPlataformId: string;
}
