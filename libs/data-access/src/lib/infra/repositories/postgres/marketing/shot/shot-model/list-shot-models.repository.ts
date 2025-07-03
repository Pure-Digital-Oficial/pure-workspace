import { Inject } from '@nestjs/common';
import {
  ListShotModelsDto,
  ListShotModelsRepository,
  ListShotModelsResponseDto,
  GeneralStatus,
  ShotModelResponseDto,
  ShotModelPrismaResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListShotModelsRepositoryImpl implements ListShotModelsRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async list(input: ListShotModelsDto): Promise<ListShotModelsResponseDto> {
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
      ...(input.filters?.subject != null
        ? {
            title: {
              contains: input.filters.subject.trim(),
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

    const [shotModels, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['shot_model'].findMany({
        where: whereClause,
        orderBy: {
          title: 'asc',
        },
        select: {
          id: true,
          title: true,
          body: true,
          status: true,
          subject: true,
          created_at: true,
          updated_at: true,
          image: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['shot_model'].count({
        where: whereClause,
      }),
      this.prismaService['shot_model'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedShotModels: ShotModelResponseDto[] = shotModels.map(
      (model: ShotModelPrismaResponseDto) => {
        return {
          id: model?.id ?? '',
          body: model?.body ?? '',
          createdAt: model?.created_at ?? new Date(),
          updatedAt: model?.updated_at ?? new Date(),
          createdBy: model?.user.nickname ?? '',
          status: model?.status ?? '',
          image: model?.image ?? '',
          subject: model?.subject ?? '',
          title: model?.title ?? '',
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      models: mappedShotModels,
    };
  }
}
