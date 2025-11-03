import { Injectable } from '@nestjs/common';
import { EditTransaction, EditTransactionDto } from '@pure-workspace/domain';

@Injectable()
export class EditTransactionService {
  constructor(private useCase: EditTransaction) {}

  async edit(input: EditTransactionDto) {
    return await this.useCase.execute(input);
  }
}
