import {
  FindUserInShotDto,
  FindUserInShotRepository,
} from '../../../../../../src';
import { ShotMock } from '../../../../entities';

export class FindUserInShotRepositoryMock implements FindUserInShotRepository {
  inputMock = {} as FindUserInShotDto;
  async find(input: FindUserInShotDto): Promise<string> {
    this.inputMock = input;
    return ShotMock.id;
  }
}
