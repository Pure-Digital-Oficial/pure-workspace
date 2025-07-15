import { Injectable } from '@nestjs/common';
import {
  RegisterHistoryShots,
  RegisterHistoryShotsDto,
} from '@pure-workspace/domain';

@Injectable()
export class RegisterHistoryShotsService {
  constructor(private useCase: RegisterHistoryShots) {}
  async register(input: RegisterHistoryShotsDto) {
    return await this.useCase.execute(input);
  }
}
