import { Injectable } from '@nestjs/common';
import { DeleteShotDto, DeleteShot } from '@pure-workspace/domain';

@Injectable()
export class DeleteShotService {
  constructor(private useCase: DeleteShot) {}

  async delete(input: DeleteShotDto) {
    return this.useCase.execute(input);
  }
}
