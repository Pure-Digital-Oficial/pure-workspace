import {
  FindTriggerByContentRepository,
  FindTriggerByEntityDto,
  TriggerResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class FindTriggerByContentRepositoryImpl
  implements FindTriggerByContentRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindTriggerByEntityDto): Promise<TriggerResponseDto> {
    const { entity, loggedUserId, id } = input;

    const filteredContent = await this.prismaService['trigger'].findFirst({
      where: {
        content: entity,
        user_id: loggedUserId,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        type: true,
        name: true,
        status: true,
        content: true,
        description: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    let outputReturn: TriggerResponseDto = {} as TriggerResponseDto;

    if (filteredContent?.id !== id) {
      outputReturn = {
        id: filteredContent?.id ?? '',
        name: filteredContent?.name ?? '',
        type: filteredContent?.type ?? '',
        status: filteredContent?.status ?? '',
        content: filteredContent?.content ?? '',
        createdBy: filteredContent?.user.nickname ?? '',
        description: filteredContent?.description ?? '',
        createdAt: filteredContent?.created_at ?? new Date(),
        updatedAt: filteredContent?.updated_at ?? new Date(),
      };
    }
    return outputReturn;
  }
}
