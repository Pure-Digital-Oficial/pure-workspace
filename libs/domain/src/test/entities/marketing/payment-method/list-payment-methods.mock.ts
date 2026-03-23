import { faker } from '@faker-js/faker';
import { ListPaymentMethodsResponseDto } from '../../../../index';
import { PaymentMethodMock } from './payment-method.mock';

export const ListPaymentMethodsMock: ListPaymentMethodsResponseDto = {
  filteredTotal: faker.number.int(),
  total: faker.number.int(),
  totalPages: faker.number.int(),
  paymentMethods: [PaymentMethodMock],
};
