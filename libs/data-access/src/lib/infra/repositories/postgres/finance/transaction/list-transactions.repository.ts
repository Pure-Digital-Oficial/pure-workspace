import { Inject } from '@nestjs/common';
import {
  ListTransactionsDto,
  ListTransactionsRepository,
  ListTransactionsResponseDto,
  TransactionResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListTransactionsRepositoryImpl
  implements ListTransactionsRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListTransactionsDto): Promise<ListTransactionsResponseDto> {
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
    };

    const [transactions, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['transaction'].findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          user: {
            select: {
              nickname: true,
            },
          },
          name: true,
          status: true,
          type: true,
          value: true,
          created_at: true,
          updated_at: true,
          final_date: true,
          initial_date: true,
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['transaction'].count({
        where: whereClause,
      }),
      this.prismaService['transaction'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedTransactions: TransactionResponseDto[] = transactions.map(
      (transactions) => {
        return {
          id: transactions?.id ?? '',
          category: {
            id: transactions?.category?.id ?? '',
            name: transactions?.category?.name ?? '',
          },
          createdBy: transactions?.user.nickname ?? '',
          name: transactions?.name ?? '',
          status: transactions?.status ?? '',
          type: transactions?.type ?? '',
          value: transactions?.value ?? 0,
          createdAt: transactions?.created_at ?? new Date(),
          updatedAt: transactions?.updated_at ?? new Date(),
          finalDate: transactions?.final_date ?? new Date(),
          initialDate: transactions?.initial_date ?? new Date(),
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      transactions: mappedTransactions,
    };
  }
}
