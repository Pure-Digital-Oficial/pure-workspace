import { Injectable } from '@nestjs/common';
import {
  CreateCategoryTransaction,
  CreateCategoryTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreateCategoryTransactionService {
  constructor(private useCase: CreateCategoryTransaction) {}

  async create(input: CreateCategoryTransactionDto) {
    return await this.useCase.execute(input);
  }
}
