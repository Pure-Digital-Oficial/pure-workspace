import {
  ListPaymentMethodsDto,
  ListPaymentMethodsResponseDto,
} from '../../../dtos';

export interface ListPaymentMethodsRepository {
  list(input: ListPaymentMethodsDto): Promise<ListPaymentMethodsResponseDto>;
}
