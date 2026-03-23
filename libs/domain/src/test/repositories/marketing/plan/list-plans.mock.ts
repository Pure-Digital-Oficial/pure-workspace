import {
  ListPlansDto,
  ListPlansRepository,
  ListPlansResponseDto,
} from '../../../../index';
import { ListPlansMock } from '../../../entities';

export class ListPlansRepositoryMock implements ListPlansRepository {
  inputMock = {} as ListPlansDto;
  async list(input: ListPlansDto): Promise<ListPlansResponseDto> {
    this.inputMock = input;
    return ListPlansMock;
  }
}
