import { FindPlanByIdRepository, PlanResponseDto } from '../../../../index';
import { PlanMock } from '../../../entities';

export class FindPlanByIdRepositoryMock implements FindPlanByIdRepository {
  inputMock = '';
  async find(id: string): Promise<PlanResponseDto> {
    this.inputMock = id;
    return PlanMock;
  }
}
