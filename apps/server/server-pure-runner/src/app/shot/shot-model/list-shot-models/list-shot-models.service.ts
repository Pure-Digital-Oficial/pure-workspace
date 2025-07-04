import { Injectable } from '@nestjs/common';
import { ListShotModels, ListShotModelsDto } from '@pure-workspace/domain';

@Injectable()
export class ListShotModelsService {
  constructor(private useCase: ListShotModels) {}

  async list(input: ListShotModelsDto) {
    return await this.useCase.execute(input);
  }
}
