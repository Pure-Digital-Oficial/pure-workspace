import { Injectable } from '@nestjs/common';
import { CreateBudget, CreateBudgetDto } from '@pure-workspace/domain';

@Injectable()
export class CreateBudgetService {
  constructor(private useCase: CreateBudget) {}

  async create(input: CreateBudgetDto) {
    return await this.useCase.execute(input);
  }
}
