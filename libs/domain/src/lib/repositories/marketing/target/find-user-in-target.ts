import { FindUserInTargetDto, TargetResponseDto } from '../../../dtos';

export interface FindUserInTargetRepository {
  find(input: FindUserInTargetDto): Promise<TargetResponseDto>;
}
