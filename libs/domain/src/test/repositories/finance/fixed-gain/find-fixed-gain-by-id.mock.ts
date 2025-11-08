import {
  FindFixedGainByIdRepository,
  FixedGainResponseDto,
} from '../../../../index';
import { FixedGainMock } from '../../../entities';

export class FindFixedGainByIdRepositoryMock
  implements FindFixedGainByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<FixedGainResponseDto> {
    this.inputMock = id;
    return FixedGainMock;
  }
}
