import { Inject } from '@nestjs/common';
import {
  ListShotsDto,
  ListShotsRepository,
  ListShotsResponseDto,
  GeneralStatus,
  ShotResponseDto,
  ShotPrismaResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListShotsRepositoryImpl implements ListShotsRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async list(input: ListShotsDto): Promise<ListShotsResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.title != null
        ? {
            title: {
              contains: input.filters.title.trim(),
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

    const [shots, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['shot'].findMany({
        where: whereClause,
        orderBy: {
          title: 'asc',
        },
        select: {
          id: true,
          title: true,
          scheduled: true,
          status: true,
          model_id: true,
          schedule_date: true,
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
      this.prismaService['shot'].count({
        where: whereClause,
      }),
      this.prismaService['shot'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedShots: ShotResponseDto[] = shots.map(
      (shot: ShotPrismaResponseDto) => {
        return {
          id: shot?.id ?? '',
          createdAt: shot?.created_at ?? new Date(),
          updatedAt: shot?.updated_at ?? new Date(),
          createdBy: shot?.user.nickname ?? '',
          status: shot?.status ?? '',
          scheduled: shot?.scheduled ?? false,
          scheduleDate: shot.schedule_date ?? new Date(),
          title: shot?.title ?? '',
          modelId: shot?.model_id ?? '',
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      shots: mappedShots,
    };
  }
}
