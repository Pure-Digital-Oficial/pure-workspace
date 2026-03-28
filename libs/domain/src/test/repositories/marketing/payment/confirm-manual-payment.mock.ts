import {
  ConfirmManualPaymentForRepositoryDto,
  ConfirmManualPaymentRepository,
} from '../../../../index';
import { ConfirmManualPaymentMock } from '../../../entities';

export class ConfirmManualPaymentRepositoryMock
  implements ConfirmManualPaymentRepository
{
  inputMock = {} as ConfirmManualPaymentForRepositoryDto;
  async confirm(input: ConfirmManualPaymentForRepositoryDto): Promise<string> {
    this.inputMock = input;
    return ConfirmManualPaymentMock.id;
  }
}
