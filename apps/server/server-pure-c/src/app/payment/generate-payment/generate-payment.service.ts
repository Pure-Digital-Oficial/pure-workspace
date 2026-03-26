import { Injectable } from '@nestjs/common';
import { GeneratePayment, GeneratePaymentDto } from '@pure-workspace/domain';

@Injectable()
export class GeneratePaymentService {
  constructor(private useCase: GeneratePayment) {}

  async generate(input: GeneratePaymentDto) {
    return await this.useCase.execute(input);
  }
}
