import { Injectable } from '@nestjs/common';
import {
  EditCategoryTransaction,
  EditCategoryTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class EditCategoryTransactionService {
  constructor(private useCase: EditCategoryTransaction) {}

  async edit(input: EditCategoryTransactionDto) {
    return await this.useCase.execute(input);
  }
}
