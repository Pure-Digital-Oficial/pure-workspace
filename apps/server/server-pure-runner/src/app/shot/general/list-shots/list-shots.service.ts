import { Injectable } from '@nestjs/common';
import { ListShots, ListShotsDto } from '@pure-workspace/domain';

@Injectable()
export class ListShotsService {
  constructor(private useCase: ListShots) {}

  async list(input: ListShotsDto) {
    return await this.useCase.execute(input);
  }
}
