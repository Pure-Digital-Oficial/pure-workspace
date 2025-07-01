import { ChangeUniqueTargetTriggerDto } from '../../../dtos';

export interface ChangeTargetTriggerRepository {
  change(input: ChangeUniqueTargetTriggerDto): Promise<string>;
}
