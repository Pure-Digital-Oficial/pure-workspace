import {
  FindPaymentHistoryByCustomerIdRepository,
  PaymentHistoryResponseDto,
} from '../../../../../index';
import { PaymentHistoryMock } from '../../../../entities';

export class FindPaymentHistoryByCustomerIdRepositoryMock
  implements FindPaymentHistoryByCustomerIdRepository
{
  inputMock = '';
  async find(customerId: string): Promise<PaymentHistoryResponseDto> {
    this.inputMock = customerId;
    return PaymentHistoryMock;
  }
}
