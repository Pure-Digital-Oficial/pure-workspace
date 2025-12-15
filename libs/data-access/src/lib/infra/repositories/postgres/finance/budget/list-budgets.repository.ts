import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  BudgetPrismaResponseDto,
  BudgetResponseDto,
  ListBudgetsDto,
  ListBudgetsRepository,
  ListBudgetsResponseDto,
} from '@pure-workspace/domain';

export class ListBudgetsRepositoryImpl implements ListBudgetsRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(input: ListBudgetsDto): Promise<ListBudgetsResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.name != null
        ? {
            name: {
              contains: input.filters.name.trim(),
              mode: 'insensitive' as const,
            },
            status: {
              not: {
                equals: 'INACTIVE' as const,
              },
            },
          }
        : {
            status: {
              not: {
                equals: 'INACTIVE' as const,
              },
            },
          }),
    };

    const [budgets, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['budget'].findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          name: true,
          description: true,
          limit_value: true,
          status: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              id: true,
              nickname: true,
              picture: true,
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['budget'].count({
        where: whereClause,
      }),
      this.prismaService['budget'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedBudgets: BudgetResponseDto[] = budgets.map(
      (budget: BudgetPrismaResponseDto) => {
        return {
          id: budget?.id ?? '',
          name: budget?.name ?? '',
          limitValue: budget?.limit_value ?? 0,
          status: budget?.status ?? '',
          description: budget?.description ?? '',
          createdBy: {
            id: budget?.user.id ?? '',
            nickname: budget?.user.nickname ?? '',
            picture: budget?.user.picture ?? '',
          },
          createdAt: budget?.created_at ?? new Date(),
          updatedAt: budget?.updated_at ?? new Date(),
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      budgets: mappedBudgets,
    };
  }
}
