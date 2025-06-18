import { TriggerResponseDto } from '../../../dtos';

export interface FindTriggerByNameRepository {
  find(name: string): Promise<TriggerResponseDto>;
}
