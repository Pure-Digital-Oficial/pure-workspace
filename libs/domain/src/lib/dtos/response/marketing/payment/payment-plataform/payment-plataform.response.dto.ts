import { BaseEntityResponseDto } from '../../../utils';

export interface PaymentPlataformResponseDto extends BaseEntityResponseDto {
  id: string;
  title: string;
  description: string;
  nationality: string;
  key: string;
  secretKey: string;
}
