import {
  FindTransactionByNameAndValueDto,
  FindTransactionByNameAndValueRepository,
  TransactionResponseDto,
} from '../../../../../src';

export class FindTransactionByNameAndValueRepositoryMock
  implements FindTransactionByNameAndValueRepository
{
  inputMock = {} as FindTransactionByNameAndValueDto;
  async find(
    input: FindTransactionByNameAndValueDto
  ): Promise<TransactionResponseDto> {
    this.inputMock = input;
    return {} as TransactionResponseDto;
  }
}
