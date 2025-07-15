import { Injectable } from '@nestjs/common';
import { DeleteTargetsDto, DeleteTargets } from '@pure-workspace/domain';

@Injectable()
export class DeleteTargetsService {
  constructor(private useCase: DeleteTargets) {}

  async delete(input: DeleteTargetsDto) {
    return this.useCase.execute(input);
  }
}
