import { Injectable } from '@nestjs/common';
import { CreateFixedGain, CreateFixedGainDto } from '@pure-workspace/domain';

@Injectable()
export class CreateFixedGainService {
  constructor(private useCase: CreateFixedGain) {}

  async create(input: CreateFixedGainDto) {
    return await this.useCase.execute(input);
  }
}
