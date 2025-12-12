import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CategoryTransactionPrismaResponseDto,
  CategoryTransactionResponseDto,
  ListCategoryTransactionsDto,
  ListCategoryTransactionsRepository,
  ListCategoryTransactionsResponseDto,
} from '@pure-workspace/domain';

export class ListCategoryTransactionsRepositoryImpl
  implements ListCategoryTransactionsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(
    input: ListCategoryTransactionsDto
  ): Promise<ListCategoryTransactionsResponseDto> {
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

    const [categories, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['category_transaction'].findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          name: true,
          description: true,
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
      this.prismaService['category_transaction'].count({
        where: whereClause,
      }),
      this.prismaService['category_transaction'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedCategoryTransactions: CategoryTransactionResponseDto[] =
      categories.map((category: CategoryTransactionPrismaResponseDto) => {
        return {
          id: category?.id ?? '',
          name: category?.name ?? '',
          description: category?.description ?? '',
          createdBy: {
            id: category?.user.id ?? '',
            nickname: category?.user.nickname ?? '',
            picture: category?.user.picture ?? '',
          },
          status: category?.status ?? '',
          createdAt: category?.created_at ?? new Date(),
          updatedAt: category?.updated_at ?? new Date(),
        };
      });

    return {
      total,
      filteredTotal,
      totalPages,
      categories: mappedCategoryTransactions,
    };
  }
}
