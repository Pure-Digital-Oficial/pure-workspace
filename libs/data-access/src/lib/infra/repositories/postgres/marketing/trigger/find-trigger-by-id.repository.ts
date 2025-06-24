import { Inject } from '@nestjs/common';
import {
  FindTriggerByIdRepository,
  TriggerResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class FindTriggerByIdRepositoryImpl
  implements FindTriggerByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<TriggerResponseDto> {
    const filteredId = await this.prismaService['trigger'].findFirst({
      where: {
        id,
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

    return filteredId?.id ?? '';
  }
}
