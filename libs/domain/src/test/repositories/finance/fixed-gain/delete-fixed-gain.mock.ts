import {
  DeleteFixedGainDto,
  DeleteFixedGainRepository,
} from '../../../../index';
import { FixedGainMock } from '../../../entities';

export class DeleteFixedGainRepositoryMock
  implements DeleteFixedGainRepository
{
  inputMock = {} as DeleteFixedGainDto;
  async delete(input: DeleteFixedGainDto): Promise<string> {
    this.inputMock = input;
    return FixedGainMock.id;
  }
}
