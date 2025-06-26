import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  FindTargetByContentRepository,
  FindTargetByEntityDto,
  TargetResponseDto,
} from '@pure-workspace/domain';

export class FindTargetByContentRepositoryImpl
  implements FindTargetByContentRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindTargetByEntityDto): Promise<TargetResponseDto> {
    const { entity, loggedUserId } = input;

    const filteredTarget = await this.prismaService[
      'target_reference'
    ].findFirst({
      where: {
        user_id: loggedUserId,
        content: entity,
      },
      select: {
        id: true,
        content: true,
        local_id: true,
        status: true,
        trigger_id: true,
        created_at: true,
        deleted_at: true,
        updated_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return {
      id: filteredTarget?.id ?? '',
      content: filteredTarget?.content ?? '',
      createdAt: filteredTarget?.created_at ?? new Date(),
      updatedAt: filteredTarget?.updated_at ?? new Date(),
      createdBy: filteredTarget?.user.nickname ?? '',
      status: filteredTarget?.status ?? '',
      triggerId: filteredTarget?.trigger_id ?? '',
    };
  }
}
