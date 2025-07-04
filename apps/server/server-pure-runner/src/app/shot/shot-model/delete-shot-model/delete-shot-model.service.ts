import { Injectable } from '@nestjs/common';
import { DeleteShotModelDto, DeleteShotModel } from '@pure-workspace/domain';

@Injectable()
export class DeleteShotModelService {
  constructor(private useCase: DeleteShotModel) {}

  async delete(input: DeleteShotModelDto) {
    return this.useCase.execute(input);
  }
}
