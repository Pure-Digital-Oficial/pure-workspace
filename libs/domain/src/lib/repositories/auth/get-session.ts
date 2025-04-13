import { SessionResponseDto } from '../../dtos';

export interface GetSessionRepository {
  get(userId: string): Promise<Omit<SessionResponseDto, 'loggedAppId'>>;
}
