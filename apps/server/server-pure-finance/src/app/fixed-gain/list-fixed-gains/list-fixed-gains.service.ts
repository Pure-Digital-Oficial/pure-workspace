import { Injectable } from '@nestjs/common';
import { ListFixedGains, ListFixedGainsDto } from '@pure-workspace/domain';

@Injectable()
export class ListFixedGainsService {
  constructor(private useCase: ListFixedGains) {}

  async list(input: ListFixedGainsDto) {
    return await this.useCase.execute(input);
  }
}
