import { Injectable } from '@nestjs/common';
import { ListTargets, ListTargetsDto } from '@pure-workspace/domain';

@Injectable()
export class ListTargetsService {
  constructor(private useCase: ListTargets) {}

  async list(input: ListTargetsDto) {
    return await this.useCase.execute(input);
  }
}
