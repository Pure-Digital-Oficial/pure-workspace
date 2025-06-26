import { FindTriggerByEntityDto, TriggerResponseDto } from '../../../dtos';

export interface FindTriggerByNameRepository {
  find(input: FindTriggerByEntityDto): Promise<TriggerResponseDto>;
}
