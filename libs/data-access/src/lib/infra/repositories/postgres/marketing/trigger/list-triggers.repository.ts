import { Inject } from '@nestjs/common';
import {
  ListTriggersDto,
  ListTriggersRepository,
  ListTriggersResponseDto,
  GeneralStatus,
  TriggerResponseDto,
  TriggerType,
  TriggerPrismaResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListTriggersRepositoryImpl implements ListTriggersRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async list(input: ListTriggersDto): Promise<ListTriggersResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.name != null
        ? {
            name: {
              contains: input.filters.name.trim(),
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(input.filters?.status != null
        ? {
            status: {
              equals: input.filters.status as GeneralStatus,
            },
          }
        : {
            status: {
              equals: 'ACTIVE' as GeneralStatus,
            },
          }),
    };

    const [triggers, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['trigger'].findMany({
        where: whereClause,
        orderBy: {
          name: 'asc',
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
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['trigger'].count({
        where: whereClause,
      }),
      this.prismaService['trigger'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedTriggers: TriggerResponseDto[] = triggers.map(
      (trigger: TriggerPrismaResponseDto) => {
        return {
          id: trigger.id ?? '',
          name: trigger.name ?? '',
          content: trigger.content ?? '',
          description: trigger.description ?? '',
          status: trigger.status ?? '',
          type: trigger.type ?? ('' as TriggerType),
          createdBy: trigger.user.nickname ?? '',
          createdAt: trigger.created_at ?? new Date(),
          updatedAt: trigger.updated_at ?? new Date(),
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      triggers: mappedTriggers,
    };
  }
}
