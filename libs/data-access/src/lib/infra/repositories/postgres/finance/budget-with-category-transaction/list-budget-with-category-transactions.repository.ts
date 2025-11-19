import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ListBudgetWithCategoryTransactionsRepository,
  ListBudgetWithCategoryTransactionsDto,
  ListBudgetWithCategoryTransactionsResponseDto,
  BudgetWithCategoryTransactionResponseDto,
  BudgetWithCategoryTransactionPrismaResponseDto,
} from '@pure-workspace/domain';

export class ListBudgetWithCategoryTransactionsRepositoryImpl
  implements ListBudgetWithCategoryTransactionsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(
    input: ListBudgetWithCategoryTransactionsDto
  ): Promise<ListBudgetWithCategoryTransactionsResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.budgetId != null
        ? {
            budget_id: input.filters?.budgetId ?? undefined,
          }
        : {}),
      ...(input.filters?.categoryTransactionId != null
        ? {
            category_id: input.filters?.categoryTransactionId ?? undefined,
          }
        : {}),
    };

    const [items, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['category_x_budget'].findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          budget: {
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
                  nickname: true,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              description: true,
              status: true,
              created_at: true,
              updated_at: true,
              user: {
                select: {
                  nickname: true,
                },
              },
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['category_x_budget'].count({
        where: whereClause,
      }),
      this.prismaService['category_x_budget'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedBudgetWithCategoryTransaction: BudgetWithCategoryTransactionResponseDto[] =
      items.map((items: BudgetWithCategoryTransactionPrismaResponseDto) => {
        return {
          id: `${items.budget?.id}-${items.category?.id}`,
          budget: {
            id: items.budget?.id ?? '',
            name: items.budget?.name ?? '',
            limitValue: items.budget?.limit_value ?? 0,
            status: items.budget?.status ?? '',
            description: items.budget?.description ?? '',
            createdBy: items.budget?.user.nickname ?? '',
            createdAt: items.budget?.created_at ?? new Date(),
            updatedAt: items.budget?.updated_at ?? new Date(),
          },
          categoryTransaction: {
            id: items.category?.id ?? '',
            name: items.category?.name ?? '',
            description: items.category?.description ?? '',
            status: items.category?.status ?? '',
            createdBy: items.category?.user.nickname ?? '',
            createdAt: items.category?.created_at ?? new Date(),
            updatedAt: items.category?.updated_at ?? new Date(),
          },
        };
      });

    return {
      total,
      filteredTotal,
      totalPages,
      items: mappedBudgetWithCategoryTransaction,
    };
  }
}
