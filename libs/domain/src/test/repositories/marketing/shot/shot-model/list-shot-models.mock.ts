import {
  ListShotModelsDto,
  ListShotModelsRepository,
  ListShotModelsResponseDto,
} from '../../../../../../src';
import { ListShotModelsMock } from '../../../../entities';

export class ListShotModelsRepositoryMock implements ListShotModelsRepository {
  inputMock = {} as ListShotModelsDto;
  async list(input: ListShotModelsDto): Promise<ListShotModelsResponseDto> {
    this.inputMock = input;
    return ListShotModelsMock;
  }
}
