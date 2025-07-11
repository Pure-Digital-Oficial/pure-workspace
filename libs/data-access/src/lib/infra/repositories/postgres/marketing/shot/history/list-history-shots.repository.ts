import { Inject } from '@nestjs/common';
import {
  ListHistoryShotsDto,
  ListHistoryShotsRepository,
  ListHistoryShotsResponseDto,
  InternalStatus,
  HistoryShotResponseDto,
  HistoryShotPrismaResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListHistoryShotsRepositoryImpl
  implements ListHistoryShotsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async list(input: ListHistoryShotsDto): Promise<ListHistoryShotsResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.status != null
        ? {
            status: {
              equals: input.filters.status as InternalStatus,
            },
          }
        : {}),
    };

    const [historyShots, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['history_shot'].findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          target_id: true,
          shot_id: true,
          error: true,
          status: true,
          oppened: true,
          clicked_in_link: true,
          created_at: true,
          updated_at: true,
          clicked_at: true,
          oppened_at: true,
          shoted_at: true,
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['history_shot'].count({
        where: whereClause,
      }),
      this.prismaService['history_shot'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedHistoryShots: HistoryShotResponseDto[] = historyShots.map(
      (history: HistoryShotPrismaResponseDto) => {
        return {
          id: history?.id ?? '',
          shotId: history?.shot_id ?? '',
          targetId: history.target_id ?? '',
          createdAt: history?.created_at ?? new Date(),
          updatedAt: history?.updated_at ?? new Date(),
          clickedAt: history?.clicked_at ?? new Date(),
          oppenedAt: history?.oppened_at ?? new Date(),
          shotedAt: history?.shoted_at ?? new Date(),
          oppened: history?.oppened ?? false,
          clickedInLink: history?.clicked_in_link ?? false,
          status: history?.status ?? '',
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      historical: mappedHistoryShots,
    };
  }
}
