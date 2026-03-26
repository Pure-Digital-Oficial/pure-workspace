import { Injectable } from '@nestjs/common';
import {
  CreatePaymentHistory,
  CreatePaymentHistoryDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreatePaymentHistoryService {
  constructor(private useCase: CreatePaymentHistory) {}

  async create(input: CreatePaymentHistoryDto) {
    return await this.useCase.execute(input);
  }
}
