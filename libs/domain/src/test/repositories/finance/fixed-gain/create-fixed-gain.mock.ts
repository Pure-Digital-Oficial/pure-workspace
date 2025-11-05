import {
  CreateFixedGainDto,
  CreateFixedGainRepository,
} from '../../../../index';
import { FixedGainMock } from '../../../entities';

export class CreateFixedGainRepositoryMock
  implements CreateFixedGainRepository
{
  inputMock = {} as CreateFixedGainDto;
  async create(input: CreateFixedGainDto): Promise<string> {
    this.inputMock = input;
    return FixedGainMock.id;
  }
}
