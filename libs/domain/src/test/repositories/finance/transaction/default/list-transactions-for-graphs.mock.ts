import { ListTransactionsForGraphsMock } from '../../../../entities';
import {
  ListTransactionsForGraphsDto,
  ListTransactionsForGraphsRepository,
  ListTransactionsForGraphsResponseDto,
} from '../../../../../index';

export class ListTransactionsForGraphsRepositoryMock
  implements ListTransactionsForGraphsRepository
{
  inputMock = {} as ListTransactionsForGraphsDto;
  async list(
    input: ListTransactionsForGraphsDto
  ): Promise<ListTransactionsForGraphsResponseDto> {
    this.inputMock = input;
    return ListTransactionsForGraphsMock;
  }
}
