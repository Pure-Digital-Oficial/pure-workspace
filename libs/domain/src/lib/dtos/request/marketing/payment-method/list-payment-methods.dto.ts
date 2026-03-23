import { ListPaymentMethodsFiltersDto } from '.';

export interface ListPaymentMethodsDto {
  filters?: ListPaymentMethodsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
