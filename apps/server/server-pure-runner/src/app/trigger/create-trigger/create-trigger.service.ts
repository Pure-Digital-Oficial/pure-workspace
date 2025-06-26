import { Injectable } from '@nestjs/common';
import { CreateTrigger, CreateTriggerDto } from '@pure-workspace/domain';

@Injectable()
export class CreateTriggerService {
  constructor(private useCase: CreateTrigger) {}
  async create(input: CreateTriggerDto) {
    return await this.useCase.execute(input);
  }
}
