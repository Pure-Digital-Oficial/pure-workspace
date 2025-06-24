import { TriggerResponseDto } from '../../../dtos';

export interface FindTriggerByIdRepository {
  find(id: string): Promise<TriggerResponseDto>;
}
