import {
  FindTriggerByNameRepository,
  TriggerResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class FindTriggerByNameRepositoryImpl
  implements FindTriggerByNameRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(name: string): Promise<TriggerResponseDto> {
    const filteredName = await this.prismaService['trigger'].findFirst({
      where: {
        name,
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

    return {
      id: filteredName?.id ?? '',
      name: filteredName?.name ?? '',
      type: filteredName?.type ?? '',
      content: filteredName?.content ?? '',
      createBy: filteredName?.user.nickname ?? '',
      description: filteredName?.description ?? '',
      createdAt: filteredName?.created_at ?? new Date(),
      updatedAt: filteredName?.updated_at ?? new Date(),
    };
  }
}
