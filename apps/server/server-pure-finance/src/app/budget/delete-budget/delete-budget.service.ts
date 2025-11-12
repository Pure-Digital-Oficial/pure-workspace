import { Injectable } from '@nestjs/common';
import { DeleteBudget, DeleteBudgetDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteBudgetService {
  constructor(private useCase: DeleteBudget) {}

  async delete(input: DeleteBudgetDto) {
    return await this.useCase.execute(input);
  }
}
