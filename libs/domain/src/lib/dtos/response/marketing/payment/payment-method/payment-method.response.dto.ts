import { BaseEntityResponseDto } from '../../../utils';

export interface PaymentMethodResponseDto extends BaseEntityResponseDto {
  id: string;
  title: string;
  description: string;
  value: string;
}
