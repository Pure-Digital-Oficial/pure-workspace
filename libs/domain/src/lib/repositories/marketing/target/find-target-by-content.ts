import { FindTargetByEntityDto, TargetResponseDto } from '../../../dtos';

export interface FindTargetByContentRepository {
  find(input: FindTargetByEntityDto): Promise<TargetResponseDto>;
}
