import {
  FindPaymentPlataformByIdRepository,
  PaymentPlataformResponseDto,
} from '../../../../../index';
import { PaymentPlataformMock } from '../../../../entities';

export class FindPaymentPlataformByIdRepositoryMock
  implements FindPaymentPlataformByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<PaymentPlataformResponseDto> {
    this.inputMock = id;
    return PaymentPlataformMock;
  }
}
