import {
  FindShotByEntityDto,
  FindTargetsByShotIdRepository,
  ListTargetsResponseDto,
} from '../../../../../src';
import { ListTargetsMock } from '../../../entities';

export class FindTargetsByShotIdRepositoryMock
  implements FindTargetsByShotIdRepository
{
  inputMock = {} as FindShotByEntityDto;
  async find(input: FindShotByEntityDto): Promise<ListTargetsResponseDto> {
    this.inputMock = input;
    return ListTargetsMock;
  }
}
