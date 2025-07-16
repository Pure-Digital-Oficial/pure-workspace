import { Injectable } from '@nestjs/common';
import { CreateTargets, CreateTargetsDto } from '@pure-workspace/domain';

@Injectable()
export class CreateTargetsService {
  constructor(private useCase: CreateTargets) {}
  async create(input: CreateTargetsDto) {
    return await this.useCase.execute(input);
  }
}
