import { Injectable } from '@nestjs/common';
import { ListHistoryShots, ListHistoryShotsDto } from '@pure-workspace/domain';

@Injectable()
export class ListHistoryShotsService {
  constructor(private useCase: ListHistoryShots) {}

  async list(input: ListHistoryShotsDto) {
    return await this.useCase.execute(input);
  }
}
