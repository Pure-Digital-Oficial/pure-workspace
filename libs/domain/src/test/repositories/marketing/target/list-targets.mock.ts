import {
  ListTargetsDto,
  ListTargetsRepository,
  ListTargetsResponseDto,
} from '../../../../../src';
import { ListTargetsMock } from '../../../entities';

export class ListTargetsRepositoryMock implements ListTargetsRepository {
  inputMock = {} as ListTargetsDto;
  async list(input: ListTargetsDto): Promise<ListTargetsResponseDto> {
    this.inputMock = input;
    return ListTargetsMock;
  }
}
