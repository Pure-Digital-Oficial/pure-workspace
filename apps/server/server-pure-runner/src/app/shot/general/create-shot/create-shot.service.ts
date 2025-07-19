import { Injectable } from '@nestjs/common';
import { CreateShot, CreateShotDto } from '@pure-workspace/domain';

@Injectable()
export class CreateShotService {
  constructor(private useCase: CreateShot) {}
  async create(input: CreateShotDto) {
    return await this.useCase.execute(input);
  }
}
