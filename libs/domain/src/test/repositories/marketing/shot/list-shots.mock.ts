import {
  ListShotsDto,
  ListShotsRepository,
  ListShotsResponseDto,
} from '../../../../../src';
import { ListShotsMock } from '../../../entities';

export class ListShotsRepositoryMock implements ListShotsRepository {
  inputMock = {} as ListShotsDto;
  async list(input: ListShotsDto): Promise<ListShotsResponseDto> {
    this.inputMock = input;
    return ListShotsMock;
  }
}
