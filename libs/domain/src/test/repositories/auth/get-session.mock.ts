import { GetSessionRepository, SessionResponseDto } from '../../../../src';
import { SessionMock } from '../../entities';

export class GetSessionRepositoryMock implements GetSessionRepository {
  mockId = '';
  async get(userId: string): Promise<SessionResponseDto> {
    this.mockId = userId;
    return SessionMock;
  }
}
