import { Injectable } from '@nestjs/common';
import { DeleteTargetDto, DeleteTarget } from '@pure-workspace/domain';

@Injectable()
export class DeleteTargetService {
  constructor(private useCase: DeleteTarget) {}

  async delete(input: DeleteTargetDto) {
    return this.useCase.execute(input);
  }
}
