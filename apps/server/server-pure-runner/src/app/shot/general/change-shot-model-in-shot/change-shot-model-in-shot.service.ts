import { Injectable } from '@nestjs/common';
import {
  ChangeShotModelInShot,
  ChangeShotModelInShotDto,
} from '@pure-workspace/domain';

@Injectable()
export class ChangeShotModelInShotService {
  constructor(private useCase: ChangeShotModelInShot) {}
  async change(input: ChangeShotModelInShotDto) {
    return await this.useCase.execute(input);
  }
}
