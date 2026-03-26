import { PlanResponseDto } from '../../../dtos';

export interface FindPlanByIdRepository {
  find(id: string): Promise<PlanResponseDto>;
}
