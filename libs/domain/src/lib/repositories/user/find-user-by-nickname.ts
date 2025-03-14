import { UserResponseDto } from '../../dtos';

export interface FindUserByNicknameRepository {
  find(nickname: string): Promise<UserResponseDto>;
}
