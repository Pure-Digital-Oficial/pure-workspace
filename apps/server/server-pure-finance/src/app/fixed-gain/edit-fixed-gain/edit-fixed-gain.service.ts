import { Injectable } from '@nestjs/common';
import { EditFixedGain, EditFixedGainDto } from '@pure-workspace/domain';

@Injectable()
export class EditFixedGainService {
  constructor(private useCase: EditFixedGain) {}

  async edit(input: EditFixedGainDto) {
    return await this.useCase.execute(input);
  }
}
