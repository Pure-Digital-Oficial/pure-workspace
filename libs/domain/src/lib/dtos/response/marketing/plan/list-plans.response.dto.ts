import { BaseListEntitiesResponseDto } from '../../utils';
import { PlanResponseDto } from './plan-response.dto';

export interface ListPlansResponseDto extends BaseListEntitiesResponseDto {
  plans: PlanResponseDto[];
}
