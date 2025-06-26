import { UserResponseDto } from '../../dtos';

export interface FindUserByEmailRepository {
  find(email: string): Promise<UserResponseDto>;
}
