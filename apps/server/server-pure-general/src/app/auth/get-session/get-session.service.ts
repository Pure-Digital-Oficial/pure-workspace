import { Injectable } from '@nestjs/common';
import { GetSession, GetSessionDto } from '@pure-workspace/domain';

@Injectable()
export class GetSessionService {
  constructor(private useCase: GetSession) {}
  async get(input: GetSessionDto) {
    return await this.useCase.execute(input);
  }
}
