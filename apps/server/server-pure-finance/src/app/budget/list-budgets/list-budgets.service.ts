import { Injectable } from '@nestjs/common';
import { ListBudgets, ListBudgetsDto } from '@pure-workspace/domain';

@Injectable()
export class ListBudgetsService {
  constructor(private useCase: ListBudgets) {}

  async list(input: ListBudgetsDto) {
    return await this.useCase.execute(input);
  }
}
