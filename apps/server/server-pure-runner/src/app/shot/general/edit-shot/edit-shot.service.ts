import { Injectable } from '@nestjs/common';
import { EditShot, EditShotDto } from '@pure-workspace/domain';

@Injectable()
export class EditShotService {
  constructor(private useCase: EditShot) {}
  async edit(input: EditShotDto) {
    return await this.useCase.execute(input);
  }
}
