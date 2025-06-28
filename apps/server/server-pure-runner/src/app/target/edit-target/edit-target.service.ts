import { Injectable } from '@nestjs/common';
import { EditTarget, EditTargetDto } from '@pure-workspace/domain';

@Injectable()
export class EditTargetService {
  constructor(private useCase: EditTarget) {}
  async edit(input: EditTargetDto) {
    return await this.useCase.execute(input);
  }
}
