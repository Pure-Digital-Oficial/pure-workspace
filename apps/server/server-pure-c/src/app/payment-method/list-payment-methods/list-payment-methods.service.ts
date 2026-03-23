import { Injectable } from '@nestjs/common';
import {
  ListPaymentMethods,
  ListPaymentMethodsDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListPaymentMethodsService {
  constructor(private useCase: ListPaymentMethods) {}

  async list(input: ListPaymentMethodsDto) {
    return await this.useCase.execute(input);
  }
}
