import { Injectable } from '@nestjs/common';
import { DeleteTrigger, DeleteTriggerDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteTriggerService {
  constructor(private useCase: DeleteTrigger) {}

  async delete(input: DeleteTriggerDto) {
    return this.useCase.execute(input);
  }
}
