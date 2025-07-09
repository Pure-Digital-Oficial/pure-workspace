import { Injectable } from '@nestjs/common';
import {
  RegisterHistoryShot,
  RegisterHistoryShotDto,
} from '@pure-workspace/domain';

@Injectable()
export class RegisterHistoryShotService {
  constructor(private useCase: RegisterHistoryShot) {}
  async register(input: RegisterHistoryShotDto) {
    return await this.useCase.execute(input);
  }
}
