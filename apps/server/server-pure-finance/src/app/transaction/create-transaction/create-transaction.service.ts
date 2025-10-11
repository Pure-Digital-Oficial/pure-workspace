import { Injectable } from '@nestjs/common';
import {
  CreateTransaction,
  CreateTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreateTransactionService {
  constructor(private useCase: CreateTransaction) {}

  async create(input: CreateTransactionDto) {
    return await this.useCase.execute(input);
  }
}
