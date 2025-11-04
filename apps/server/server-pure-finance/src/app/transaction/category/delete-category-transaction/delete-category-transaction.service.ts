import { Injectable } from '@nestjs/common';
import {
  DeleteCategoryTransaction,
  DeleteCategoryTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeleteCategoryTransactionService {
  constructor(private useCase: DeleteCategoryTransaction) {}

  async delete(input: DeleteCategoryTransactionDto) {
    return await this.useCase.execute(input);
  }
}
