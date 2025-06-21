import { FindUserInTriggerDto, TriggerResponseDto } from '../../../dtos';

export interface FindUserInTriggerRepository {
  find(input: FindUserInTriggerDto): Promise<TriggerResponseDto>;
}
