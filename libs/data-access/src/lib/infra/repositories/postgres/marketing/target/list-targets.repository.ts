import { Inject } from '@nestjs/common';
import {
  ListTargetsDto,
  ListTargetsRepository,
  ListTargetsResponseDto,
  GeneralStatus,
  TargetResponseDto,
  TargetPrismaResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListTargetsRepositoryImpl implements ListTargetsRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async list(input: ListTargetsDto): Promise<ListTargetsResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.content != null
        ? {
            content: {
              contains: input.filters.content.trim(),
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

    const [targets, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['target_reference'].findMany({
        where: whereClause,
        orderBy: {
          content: 'asc',
        },
        select: {
          id: true,
          trigger_id: true,
          status: true,
          content: true,
          created_at: true,
          updated_at: true,
          internal_status: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['target_reference'].count({
        where: whereClause,
      }),
      this.prismaService['target_reference'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedTargets: TargetResponseDto[] = targets.map(
      (target: TargetPrismaResponseDto) => {
        return {
          id: target.id ?? '',
          triggerId: target.trigger_id ?? '',
          content: target.content ?? '',
          status: target.status ?? '',
          createdBy: target.user.nickname ?? '',
          internalStatus: target?.internal_status ?? '',
          createdAt: target.created_at ?? new Date(),
          updatedAt: target.updated_at ?? new Date(),
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      targets: mappedTargets,
    };
  }
}
