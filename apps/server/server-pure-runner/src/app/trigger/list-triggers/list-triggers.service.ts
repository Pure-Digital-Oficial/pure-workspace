import { Injectable } from '@nestjs/common';
import { ListTriggers, ListTriggersDto } from '@pure-workspace/domain';

@Injectable()
export class ListTriggersService {
  constructor(private useCase: ListTriggers) {}

  async list(input: ListTriggersDto) {
    return await this.useCase.execute(input);
  }
}
