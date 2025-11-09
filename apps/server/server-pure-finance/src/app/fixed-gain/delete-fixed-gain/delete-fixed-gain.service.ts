import { Injectable } from '@nestjs/common';
import { DeleteFixedGain, DeleteFixedGainDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteFixedGainService {
  constructor(private useCase: DeleteFixedGain) {}

  async delete(input: DeleteFixedGainDto) {
    return await this.useCase.execute(input);
  }
}
