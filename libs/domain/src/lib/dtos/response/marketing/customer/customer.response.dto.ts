import { BaseEntityResponseDto } from '../../utils';

export interface CustomerResponseDto extends BaseEntityResponseDto {
  id: string;
  name: string;
  externalId: string;
  language: string;
  frequencyPayment: string;
}
