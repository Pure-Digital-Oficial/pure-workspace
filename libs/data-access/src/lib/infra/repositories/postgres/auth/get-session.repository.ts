import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  GetSessionRepository,
  SessionResponseDto,
} from '@pure-workspace/domain';

export class GetSessionRepositoryImpl implements GetSessionRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async get(userId: string): Promise<SessionResponseDto> {
    const sessionResult = await this.prismaService['user'].findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        nickname: true,
        picture: true,
        status: true,
        type: true,
      },
    });

    return {
      id: sessionResult?.id ?? '',
      nickname: sessionResult?.nickname ?? '',
      picture: sessionResult?.picture ?? '',
      status: sessionResult?.status ?? '',
      type: sessionResult?.type ?? '',
    };
  }
}
