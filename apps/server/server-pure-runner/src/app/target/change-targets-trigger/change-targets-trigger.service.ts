import { Injectable } from '@nestjs/common';
import {
  ChangeTargetsTrigger,
  ChangeTargetsTriggerDto,
} from '@pure-workspace/domain';

@Injectable()
export class ChangeTargetsTriggerService {
  constructor(private useCase: ChangeTargetsTrigger) {}
  async change(input: ChangeTargetsTriggerDto) {
    return await this.useCase.execute(input);
  }
}
