import { Injectable } from '@nestjs/common';
import { EditTrigger, EditTriggerDto } from '@pure-workspace/domain';

@Injectable()
export class EditTriggerService {
  constructor(private useCase: EditTrigger) {}
  async edit(input: EditTriggerDto) {
    return await this.useCase.execute(input);
  }
}
