import { Injectable } from '@nestjs/common';
import {
  ConfirmManualPayment,
  ConfirmManualPaymentDto,
} from '@pure-workspace/domain';

@Injectable()
export class ConfirmManualPaymentService {
  constructor(private useCase: ConfirmManualPayment) {}

  async generate(input: ConfirmManualPaymentDto) {
    return await this.useCase.execute(input);
  }
}
