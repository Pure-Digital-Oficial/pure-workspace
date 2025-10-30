import { Injectable } from '@nestjs/common';
import {
  DeleteTransaction,
  DeleteTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeleteTransactionService {
  constructor(private useCase: DeleteTransaction) {}

  async delete(input: DeleteTransactionDto) {
    return await this.useCase.execute(input);
  }
}
