import { Injectable } from '@nestjs/common';
import { EditShotModel, EditShotModelDto } from '@pure-workspace/domain';

@Injectable()
export class EditShotModelService {
  constructor(private useCase: EditShotModel) {}
  async edit(input: EditShotModelDto) {
    return await this.useCase.execute(input);
  }
}
