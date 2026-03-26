import { PaymentMethodMock } from '../../../../entities';
import {
  FindPaymentMethodByIdRepository,
  PaymentMethodResponseDto,
} from '../../../../../index';

export class FindPaymentMethodRepositoryMock
  implements FindPaymentMethodByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<PaymentMethodResponseDto> {
    this.inputMock = id;
    return PaymentMethodMock;
  }
}
