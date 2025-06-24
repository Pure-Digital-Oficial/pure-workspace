import { Injectable } from '@nestjs/common';
import {
  CreateUniqueTarget,
  CreateUniqueTargetDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreateUniqueTargetService {
  constructor(private useCase: CreateUniqueTarget) {}
  async create(input: CreateUniqueTargetDto) {
    return await this.useCase.execute(input);
  }
}
