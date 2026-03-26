import {
  CreatePaymentHistoryDto,
  CreatePaymentHistoryRepository,
} from '../../../../../index';
import { PaymentHistoryMock } from '../../../../entities';

export class CreatePaymentHistoryRepositoryMock
  implements CreatePaymentHistoryRepository
{
  inputMock = {} as CreatePaymentHistoryDto;
  async create(input: CreatePaymentHistoryDto): Promise<string> {
    this.inputMock = input;
    return PaymentHistoryMock.id;
  }
}
