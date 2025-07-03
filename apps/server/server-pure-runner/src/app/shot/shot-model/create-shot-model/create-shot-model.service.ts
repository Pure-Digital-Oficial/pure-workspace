import { Injectable } from '@nestjs/common';
import { CreateShotModel, CreateShotModelDto } from '@pure-workspace/domain';

@Injectable()
export class CreateShotModelService {
  constructor(private useCase: CreateShotModel) {}
  async create(input: CreateShotModelDto) {
    return await this.useCase.execute(input);
  }
}
