import { Injectable } from '@nestjs/common';
import { ListPlans, ListPlansDto } from '@pure-workspace/domain';

@Injectable()
export class ListPlansService {
  constructor(private useCase: ListPlans) {}

  async list(input: ListPlansDto) {
    return await this.useCase.execute(input);
  }
}
