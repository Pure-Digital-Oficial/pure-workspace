import {
  ListHistoryShotsDto,
  ListHistoryShotsRepository,
  ListHistoryShotsResponseDto,
} from '../../../../../../src';
import { ListHistoryShotsMock } from '../../../../entities';

export class ListHistoryShotsRepositoryMock
  implements ListHistoryShotsRepository
{
  inputMock = {} as ListHistoryShotsDto;
  async list(input: ListHistoryShotsDto): Promise<ListHistoryShotsResponseDto> {
    this.inputMock = input;
    return ListHistoryShotsMock;
  }
}
