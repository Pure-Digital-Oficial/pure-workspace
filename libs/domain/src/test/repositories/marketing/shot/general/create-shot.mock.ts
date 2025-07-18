import { ShotMock } from '../../../../entities';
import { CreateShotDto, CreateShotRepository } from '../../../../../../src';

export class CreateShotRepositoryMock implements CreateShotRepository {
  inputMock = {} as CreateShotDto;
  async create(input: CreateShotDto): Promise<string> {
    this.inputMock = input;
    return ShotMock.id;
  }
}
