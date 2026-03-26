import {
  FindPaymentMethodWithPlataformByIdsRepository,
  PaymentMethodWithPlataformDto,
} from '../../../../../index';
import { PaymentMethodMock, PaymentPlataformMock } from '../../../../entities';

export class FindPaymentMethodWithPlataformByIdsRepositoryMock
  implements FindPaymentMethodWithPlataformByIdsRepository
{
  inputMock = {} as PaymentMethodWithPlataformDto;
  async find(input: PaymentMethodWithPlataformDto): Promise<string> {
    this.inputMock = input;
    return `${PaymentMethodMock.id}-${PaymentPlataformMock.id}`;
  }
}
