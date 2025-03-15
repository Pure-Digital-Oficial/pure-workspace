import { UserResponseDto } from '../../dtos';

export interface FindUserByIdRepository {
  find(id: string): Promise<UserResponseDto>;
}
