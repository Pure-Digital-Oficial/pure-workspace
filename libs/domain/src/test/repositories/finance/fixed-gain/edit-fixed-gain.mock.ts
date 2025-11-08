import { EditFixedGainDto, EditFixedGainRepository } from '../../../../index';
import { FixedGainMock } from '../../../entities';

export class EditFixedGainRepositoryMock implements EditFixedGainRepository {
  inputMock = {} as EditFixedGainDto;
  async edit(input: EditFixedGainDto): Promise<string> {
    this.inputMock = input;
    return FixedGainMock.id;
  }
}
