import {
  ListFixedGainsDto,
  ListFixedGainsRepository,
  ListFixedGainsResponseDto,
} from '../../../../index';
import { ListFixedGainsMock } from '../../../entities';

export class ListFixedGainsRepositoryMock implements ListFixedGainsRepository {
  inputMock = {} as ListFixedGainsDto;
  async list(input: ListFixedGainsDto): Promise<ListFixedGainsResponseDto> {
    this.inputMock = input;
    return ListFixedGainsMock;
  }
}
