import {
  FindPaymentHistoryByExternalIdRepository,
  PaymentHistoryResponseDto,
} from '../../../../../index';
import { PaymentHistoryMock } from '../../../../entities';

export class FindPaymentHistoryByExternalIdRepositoryMock
  implements FindPaymentHistoryByExternalIdRepository
{
  inputMock = 0;
  async find(id: number): Promise<PaymentHistoryResponseDto> {
    this.inputMock = id;
    return PaymentHistoryMock;
  }
}
