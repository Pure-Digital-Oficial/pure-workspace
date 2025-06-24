import {
  FindTriggerByEntityDto,
  FindTriggerByNameRepository,
  TriggerResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class FindTriggerByNameRepositoryImpl
  implements FindTriggerByNameRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindTriggerByEntityDto): Promise<TriggerResponseDto> {
    const { entity, loggedUserId, id } = input;

    const filteredName = await this.prismaService['trigger'].findFirst({
      where: {
        name: entity,
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

    if (filteredName?.id !== id) {
      outputReturn = {
        id: filteredName?.id ?? '',
        name: filteredName?.name ?? '',
        type: filteredName?.type ?? '',
        status: filteredName?.status ?? '',
        content: filteredName?.content ?? '',
        createdBy: filteredName?.user.nickname ?? '',
        description: filteredName?.description ?? '',
        createdAt: filteredName?.created_at ?? new Date(),
        updatedAt: filteredName?.updated_at ?? new Date(),
      };
    }

    return outputReturn;
  }
}
