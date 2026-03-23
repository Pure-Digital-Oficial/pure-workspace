import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  GeneralStatus,
  ListPlansDto,
  ListPlansRepository,
  ListPlansResponseDto,
  PlanPrismaResponseDto,
  PlanResponseDto,
} from '@pure-workspace/domain';

export class ListPlansRepositoryImpl implements ListPlansRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(input: ListPlansDto): Promise<ListPlansResponseDto> {
    const { filters } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(filters?.title != null
        ? {
            title: {
              contains: filters.title.trim(),
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(filters?.status != null
        ? {
            status: {
              equals: filters.status as GeneralStatus,
            },
          }
        : {
            status: {
              equals: 'ACTIVE' as GeneralStatus,
            },
          }),
    };

    const [plans, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['plan'].findMany({
        where: whereClause,
        orderBy: {
          title: 'asc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          amount: true,
          frequency: true,
          status: true,
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
      this.prismaService['plan'].count({
        where: whereClause,
      }),
      this.prismaService['plan'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedPlans: PlanResponseDto[] = plans.map(
      (plan: PlanPrismaResponseDto) => {
        return {
          id: plan?.id ?? '',
          title: plan?.title ?? '',
          amount: plan?.amount ?? '',
          frequency: plan?.frequency ?? '',
          description: plan?.description ?? '',
          createdAt: plan?.created_at ?? new Date(),
          updatedAt: plan?.updated_at ?? new Date(),
          createdBy: plan?.user.nickname ?? '',
          status: plan?.status ?? '',
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      plans: mappedPlans,
    };
  }
}
