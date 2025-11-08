import {
  FindFixedGaindByIdRepository,
  FixedGainResponseDto,
} from '../../../../index';
import { FixedGainMock } from '../../../entities';

export class FindFixedGainByIdRepositoryMock
  implements FindFixedGaindByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<FixedGainResponseDto> {
    this.inputMock = id;
    return FixedGainMock;
  }
}
