import { TriggerResponseDto } from '../../../dtos';

export interface FindTriggerByContentRepository {
  find(content: string): Promise<TriggerResponseDto>;
}
