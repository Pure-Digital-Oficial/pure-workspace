import { Injectable } from '@nestjs/common';
import { EditUserProfile, EditUserProfileDto } from '@pure-workspace/domain';

@Injectable()
export class EditUserProfileService {
  constructor(private useCase: EditUserProfile) {}
  async edit(input: EditUserProfileDto) {
    return await this.useCase.execute(input);
  }
}
