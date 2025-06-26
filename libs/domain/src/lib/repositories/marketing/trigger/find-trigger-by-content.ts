import { FindTriggerByEntityDto, TriggerResponseDto } from '../../../dtos';

export interface FindTriggerByContentRepository {
  find(input: FindTriggerByEntityDto): Promise<TriggerResponseDto>;
}
