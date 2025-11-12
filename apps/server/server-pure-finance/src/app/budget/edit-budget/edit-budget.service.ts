import { Injectable } from '@nestjs/common';
import { EditBudget, EditBudgetDto } from '@pure-workspace/domain';

@Injectable()
export class EditBudgetService {
  constructor(private useCase: EditBudget) {}

  async edit(input: EditBudgetDto) {
    return await this.useCase.execute(input);
  }
}
